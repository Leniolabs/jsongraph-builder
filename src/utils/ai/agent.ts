import { BaseMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { StateGraph, Annotation, START, END } from "@langchain/langgraph/web";
import { conversationalModel } from "./openai";
import { createGraphTool } from "./tools";

export const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
  graph: Annotation<{
    nodes: { id: string; nodeId: string }[];
    edges: { sourceId: string; targetId: string }[];
  }>(),
});

const agent = createReactAgent({
  llm: conversationalModel,
  stateSchema: GraphState,
  tools: [createGraphTool],
  prompt: `You are a helpful assistant helping a user to create a graph.

The user can give a vague description of what he wants or he can be highly specific.

You do not need internal information of the flow, like emails, names, etc. Just focus on the flow and how nodes are connected.
Send all the details needed for the flow in the description.
Do not overcomplicate it, just describe the flow in a simple way. The tool will handle the edge cases and deep details.

IMPORTANT:
- Do not ask for clarification, just for every request, if it has information abot the flow, go ahead and trigger the creation.
- If the tool returns "Successfully created the graph" you can tell the user that the graph was created successfully.
- If the user wants to make changes to the graph you should ask for the changes and execute the create_graph tool again.
- When creating the description, consider edge cases that the user might not have thought of and include them in the description.
- Make the description of the graph as detailed as possible. Consider edge cases.
- When updating the graph, the tool knows the current state, so you can just ask for the changes in the description.
- Unless the user specifies it, do not request for error handling or anything, just the user description.
`,
});

const workflow = new StateGraph(GraphState)
  .addNode("agent", agent)
  .addEdge(START, "agent") // __start__ is a special name for the entrypoint
  .addEdge("agent", END);

export const agentGraph = workflow.compile();
