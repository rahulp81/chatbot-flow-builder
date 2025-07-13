import React from "react";
import SendMessagePanelNode from "./Nodes/SendMessagePanelNode";
import { Node } from '@xyflow/react';
import SendMessageSettings from "./Nodes/SendMessageSettings";

const nodeTypes = [
  { type: "sendMessage", nodeComp: SendMessagePanelNode, settingsComp : SendMessageSettings },
];

interface ActionPanelProps {
    selectedNodeId: string;
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    setSelectedId : React.Dispatch<React.SetStateAction<string>>;
}

function SelectedNodePanel({ node, setNodes, setSelectedId }: { node: Node, setNodes: React.Dispatch<React.SetStateAction<Node[]>>,setSelectedId : React.Dispatch<React.SetStateAction<string>> }) {
    const typeInfo = nodeTypes.find((nt) => nt.type === node.type);
    const SettingsComponent = typeInfo?.settingsComp;
    if(SettingsComponent){
        return <SettingsComponent setSelectedId={setSelectedId} setNodes={setNodes} node={node} />;
    }else{
        return<></>
    }
}

export default function ActionPanel({ selectedNodeId, nodes, setNodes, setSelectedId }: ActionPanelProps) {
  const selectedNode = selectedNodeId
    ? nodes.find((node) => node.id === selectedNodeId)
    : undefined;

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
        <SelectedNodePanel key={selectedNode.id} setSelectedId={setSelectedId} setNodes={setNodes} node={selectedNode} />
      )}
    </div>
  );
}
