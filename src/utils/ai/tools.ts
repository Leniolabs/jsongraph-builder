import { Command } from "@langchain/langgraph/web";
import { tool } from "@langchain/core/tools";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";
import { client } from "./openai";
import { nodes, nodeTypes } from "../nodes";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { IGraph } from "../graph";

const NodeSchema = z.object({
  id: z.string().describe("The id of the node."),
  nodeId: z.enum(nodeTypes as [string, ...string[]]).describe("The node type."),
});

const EdgeSchema = z.object({
  sourceId: z.string().describe("The id of the source node."),
  targetId: z.string().describe("The id of the source node."),
});

const GraphSchema = z.object({
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
});

export function formatNodesForPrompt(): string {
  let formatted = "";

  for (const group of nodes) {
    formatted += `Group: ${group.group.name}\n`;
    formatted += `Description: ${group.group.description}\n`;
    formatted += `Nodes:\n`;

    for (const node of group.nodes) {
      formatted += `  - nodeId: ${node.id}\n`;
      formatted += `    Title: ${node.title}\n`;
      formatted += `    Description: ${node.description}\n`;
      formatted += `    Type: ${node.type}\n`;

      if (node.icon) {
        formatted += `    Icon: ${node.icon}\n`;
      }

      formatted += `\n`;
    }

    formatted += `\n`;
  }

  return formatted.trim();
}

async function getGraph(
  description: string,
  currentGraph?: IGraph
): Promise<typeof GraphSchema._type> {
  const systemMessage = {
    role: "system",
    content: `Generate a JSON structure of nodes and links using the available nodes.
The proposed graph has to provide a solution to the request made by the user.

IMPORTANT: 
- Make sure that the trigger and the output are consistent with the description. 
- The inner workings are up to you unless specified by the user.
- Make sure that the graph is consistent with the user request.
- When adding nodes to process data or different types of information, make sure to parse that data accordingly using the provided nodes.
- Try to create the simplest workflow that can handle the user request, unless the user specifies otherwise.

${formatNodesForPrompt()}
`,
  } as ChatCompletionMessageParam;

  const currentGraphMessage = {
    role: "user",
    content: `This is the graph I currently have, please consider it when creating the new graph.
In case you have to add some details or modify it, make sure that the new graph is consistent with the current one.

${JSON.stringify(currentGraph, null, 2)}
`,
  } as ChatCompletionMessageParam;

  const descriptionMessage = {
    role: "user",
    content: `Generate a graph based on this description:
        
${description}`,
  } as ChatCompletionMessageParam;

  const reply = await client.chat.completions.create({
    model: "o3-mini",
    messages: [
      systemMessage,
      ...(currentGraph ? [currentGraphMessage] : []),
      descriptionMessage,
    ],
    response_format: zodResponseFormat(GraphSchema, "Graph"),
  });

  return JSON.parse(reply.choices[0].message.content || "{}") as IGraph;
}

export const createGraphTool = tool(
  async (description: string, config) => {
    const toolCallId = config.toolCall.id;

    let currentGraph: IGraph | undefined;
    try {
      currentGraph = JSON.parse(localStorage.getItem("currentGraph") || "{}") as IGraph;
    } catch (error) {
      console.log(error);
    }

    const graph = await getGraph(description, currentGraph);

    return new Command({
      update: {
        graph,
        messages: [
          {
            role: "tool",
            content: "Successfully created the graph.",
            tool_call_id: toolCallId,
          },
        ],
      },
    });
  },
  {
    name: "create_graph",
    description: "Use this to create a graph.",
    schema: z
      .string()
      .describe("Send a clean description of the user requirements. Be detailed and considering all the history on the chat."),
  }
);
