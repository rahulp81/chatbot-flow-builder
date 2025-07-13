import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Controls,
  MiniMap,
  useReactFlow,
  useOnSelectionChange,
  OnSelectionChangeParams,
  NodeTypes,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Node,
  Edge,
} from "@xyflow/react";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  setNodes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNodes,
} from "@/store/slices/flowSlice";

interface FlowContentProps {
  nodeTypes: NodeTypes;
}

export default function FlowContent({ nodeTypes }: FlowContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const edges = useSelector((state: RootState) => state.flow.edges);

  const reactFlow = useReactFlow();
  useOnSelectionChange({
    onChange: ({ nodes }: OnSelectionChangeParams) => {
      const ids = nodes.map((node) => node.id);
      dispatch(setSelectedNodes(ids));
    },
  });


  const handleNodesChange: OnNodesChange = useCallback(
    (changes) => {
      dispatch(onNodesChange(changes));
    },
    [dispatch]
  );

  const handleEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      dispatch(onEdgesChange(changes));
    },
    [dispatch]
  );

  const handleConnect: OnConnect = useCallback(
    (connection) => {
      dispatch(onConnect(connection));
    },
    [dispatch]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      const flowPosition = reactFlow.screenToFlowPosition(position);

      const newId = `${type}-${Date.now()}`;
      const newNode: Node = {
        id: newId,
        type,
        position: flowPosition,
        data: { message: `test message ${nodes.length + 1}` },
        selected: true,
      };

      // Deselected old nodes, add then add new one with selected true
      const updatedNodes = [
        ...nodes.map((node) => ({ ...node, selected: false })),
        newNode,
      ];

      dispatch(setNodes(updatedNodes));
      setSelectedNodes([newId]);
    },
    [dispatch, nodes, reactFlow]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={handleConnect}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}
