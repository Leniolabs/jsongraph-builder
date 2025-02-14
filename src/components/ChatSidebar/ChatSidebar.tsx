"use client";

import React from "react";
import { Edge, Node, useReactFlow } from "@xyflow/react";
import "./chat-sidebar.css";

import { useChat } from "../../hooks";
import { getNodeById } from "../../utils/nodes";
import { getLayoutedElements } from "../../utils/layout";
import { AssistantMessage, ChatInput, UserMessage } from "./components";
import {
  edgeToFlowEdge,
  getGraphFromFlow,
  nodeToFlowNode,
} from "../../utils/graph";

export function ChatSidebar() {
  const { setNodes, setEdges, getNodes, getEdges, fitView } = useReactFlow();

  const { messages, sendMessage, loading } = useChat({
    currentGraph: getGraphFromFlow(getNodes(), getEdges()),
    onGraphUpdate: (graph) => {
      const nodes = graph.nodes
        .map((node) => {
          const data = getNodeById(node.nodeId);
          if (data)
            return nodeToFlowNode(
              node.id.toString(),
              {
                x: 0,
                y: 0,
              },
              data
            );
          return null;
        })
        .filter((x) => x);

      const edges = graph.edges.map((edge) =>
        edgeToFlowEdge(edge.sourceId, edge.targetId)
      );

      const updated = getLayoutedElements(nodes as Node[], edges);

      setNodes(updated.nodes as Node[]);
      setEdges(updated.edges as Edge[]);

      setTimeout(() => {
        fitView({
          padding: 0.1,
          duration: 10,
        });
      }, 100);
    },
  });
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-sidebar">
      <div className="chat-messages">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <UserMessage key={msg.id} content={msg.content} />
          ) : (
            <AssistantMessage
              key={msg.id}
              content={msg.content}
              loading={msg.loading}
            />
          )
        )}
        {loading && !messages.some((msg) => msg.loading) && (
          <AssistantMessage
            key="assistant-typing"
            content="Thinking..."
            loading={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={sendMessage} streaming={loading} />
    </div>
  );
}
