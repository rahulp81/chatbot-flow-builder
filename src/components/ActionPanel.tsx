import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SendMessagePanelNode from "./Nodes/SendMessagePanelNode";
import { Node } from "@xyflow/react";

// Panel nodes (for dragging) -- Extendible
const nodeTypes = [
  {
    type: "sendMessage",
    nodeComp: SendMessagePanelNode,
  },
];

interface SelectedNodePanelProps {
  node: Node;
}

function SelectedNodePanel({ node }: SelectedNodePanelProps) {
  console.log("Selected Node:", node);
  return (
    <div className="border rounded text-sm p-4">
      <h2 className="font-semibold mb-2">Selected Node</h2>
      <div className="text-gray-700">ID: {node.id}</div>
      <div className="text-gray-700">Type: {node.type}</div>
      <pre className="text-xs bg-gray-100 p-2 rounded mt-2">
        {JSON.stringify(node.data, null, 2)}
      </pre>
    </div>
  );
}

export default function ActionPanel() {
  const selectedNodeId = useSelector(
    (state: RootState) => state.flow.selectedNodes[0]
  );

  const selectedNode = useSelector((state: RootState) =>
    selectedNodeId
      ? state.flow.nodes.find((node) => node.id === selectedNodeId)
      : undefined
  );

  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-[400px] border border-gray-300 overflow-auto">
      {!selectedNode ? (
        <div className="grid grid-cols-2 gap-3 gap-y-6 p-6">
          {nodeTypes.map((node) => (
            <node.nodeComp
              key={node.type}
              onDragStart={(e) => handleDragStart(e, node.type)}
            />
          ))}
        </div>
      ) : (
        <SelectedNodePanel node={selectedNode} />
      )}
    </div>
  );
}
