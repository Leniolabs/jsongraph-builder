import React from "react";
import { v4 as uuid } from "uuid";
import { BaseMessage } from "@langchain/core/messages";
import { agentGraph } from "../utils/ai";
import { IGraph } from "../utils/graph";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}

export function useChat(options: {
  currentGraph?: IGraph;
  onGraphUpdate: (graph: IGraph) => void;
}) {
  const { currentGraph, onGraphUpdate } = options;

  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  const sendMessage = React.useCallback(
    async (content: string) => {
      setLoading(true);

      const userMessage = { id: uuid(), role: "user", content } as ChatMessage;

      setMessages([...messages, userMessage]);

      localStorage.setItem("currentGraph", JSON.stringify(currentGraph || {}));

      const reply = await agentGraph.stream(
        {
          messages: [...messages, userMessage] as unknown as BaseMessage[],
          graph: currentGraph,
        },
        {
          streamMode: ["messages", "updates"],
        }
      );

      const assistantMessages = {} as { [key: string]: ChatMessage };

      let busy = false;
      function updateMessages() {
        if (!busy) {
          busy = true;
          setMessages([
            ...messages,
            userMessage,
            ...Object.values(assistantMessages),
          ]);
          setTimeout(() => {
            busy = false;
          }, 0);
        }
      }

      for await (const chunk of reply) {
        const [type, value] = chunk;
        if (type === "messages") {
          const [chunk] = value;

          if (chunk && "content" in chunk && chunk.text) {
            if (!(chunk.id in assistantMessages)) {
              Object.keys(assistantMessages).forEach((key) => {
                assistantMessages[key].loading = false;
              });

              assistantMessages[chunk.id] = {
                id: chunk.id,
                role: "assistant",
                content: "",
                loading: true,
              };
            }
            assistantMessages[chunk.id].content += chunk.text;
            updateMessages();
          }
        } else if (type === "updates") {
          // const [update, meta] = value;
          const updatedGraph = value.agent.graph as IGraph;
          if (updatedGraph?.nodes?.length) {
            onGraphUpdate?.(updatedGraph);
          }
        }
        setTimeout(() => {
          Object.keys(assistantMessages).forEach((key) => {
            assistantMessages[key].loading = false;
          });
          updateMessages();
        }, 100);
      }

      setLoading(false);
    },
    [messages, onGraphUpdate, currentGraph]
  );

  return {
    messages,
    loading,
    sendMessage,
  };
}
