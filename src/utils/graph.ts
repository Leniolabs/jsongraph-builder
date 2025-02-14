import { Node, Edge, Position } from "@xyflow/react";
import { NodeItem } from "./nodes";

export type IGraph = {
  nodes: {
    id: string;
    nodeId: string;
  }[];
  edges: {
    sourceId: string;
    targetId: string;
  }[];
};

export function nodeToFlowNode(
  id: string,
  position: { x: number; y: number },
  node: NodeItem
): Node {
  return {
    id,
    width: 130,
    height: 90,
    type: node.type,
    position,
    data: {
      icon: node.icon,
      label: node.title,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  } as Node;
}

export function edgeToFlowEdge(sourceId: string, targetId: string): Edge {
  return {
    id: `${sourceId}-${targetId}`,
    source: sourceId,
    target: targetId,
    animated: true,
    type: "smoothstep",
  };
}

export function getGraphFromFlow(nodes: Node[], edges: Edge[]): IGraph {
  return {
    nodes: nodes.map((node) => ({
      id: node.id,
      nodeId: node.data.id as string,
    })),
    edges: edges.map((edge) => ({
      sourceId: edge.source,
      targetId: edge.target,
    })),
  };
}
