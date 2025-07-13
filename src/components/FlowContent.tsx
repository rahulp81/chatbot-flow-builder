import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Node,
  Edge,
  useReactFlow,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeTypes,
  useOnSelectionChange,
  OnSelectionChangeParams,
} from '@xyflow/react';

interface FlowContentProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  nodeTypes : NodeTypes
}

export default function FlowContent({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setNodes,
  nodeTypes
}: FlowContentProps) {
  const reactFlow = useReactFlow();
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const onChange = useCallback(({ nodes }: OnSelectionChangeParams) => {
    setSelectedNodes(nodes.map(node => node.id));
  }, []);

  useOnSelectionChange({
    onChange,
  });

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const flowPos = reactFlow.screenToFlowPosition(position);

      const newId = `${type}-${Date.now()}`;

      setNodes((prevNodes) => {
        const newNode: Node = {
          id: newId,
          type,
          position: flowPos,
          data: {
            message: `test message ${prevNodes.length + 1}`,
          },
          selected: true,
        };

        const updatedNodes = prevNodes.map((node) => ({
          ...node,
          selected: false,
        }));

        return [...updatedNodes, newNode];
      });

      setSelectedNodes([newId]);

    },
    [reactFlow, setNodes]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}
