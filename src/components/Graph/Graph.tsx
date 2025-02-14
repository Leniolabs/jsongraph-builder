import {
  Edge,
  MiniMap,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useDropZone } from "../../hooks/useDropZone";
import { CommonNode, OutputNode, TriggerNode } from "./components";
import { edgeToFlowEdge, nodeToFlowNode } from "../../utils/graph";

export function Graph() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const { dropRef } = useDropZone((node, position) => {
    setNodes((prevNodes) => [
      ...prevNodes,
      nodeToFlowNode(
        String(Math.random()),
        {
          x: position.x - 50,
          y: position.y - 45,
        },
        node
      ),
    ]);
    setTimeout(() => {
      fitView();
    }, 100);
  });

  return (
    <div ref={dropRef} className="dropzone-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        colorMode="dark"
        nodeTypes={{
          common: CommonNode,
          trigger: TriggerNode,
          output: OutputNode,
        }}
        onConnect={(params) => {
          setEdges((prevEdges) => [
            ...prevEdges,
            edgeToFlowEdge(params.source, params.target),
          ]);
        }}
      >
        <MiniMap position="bottom-left" />
      </ReactFlow>
    </div>
  );
}
