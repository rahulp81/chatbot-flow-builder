import HeaderSection from "@/components/HeaderSection";
import { useState, useCallback } from 'react';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  MarkerType,
  NodeChange,
  EdgeChange,
  Connection,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ActionPanel from "@/components/ActionPanel";
import SendMessageNode from "./Nodes/SendMessageNode";
import FlowContent from "./FlowContent";

const nodeTypes = {
    sendMessage: SendMessageNode,
};

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

export default function FlowBuilder() {
    const [nodes, setNodes] = useState(initialNodes);
    const [selectedNodeId, setSelectedNodeId] = useState<string>('');
    const [edges, setEdges] = useState(initialEdges);

    const handlers = {
        setNodes,
        onNodesChange: (changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        onEdgesChange: (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        onConnect: (params: Connection) =>
          setEdges((eds) => {
            // Check if an edge already exists with same source & sourceHandle
            const exists = eds.some(
              (e) => e.source === params.source && e.sourceHandle === params.sourceHandle
            );
            if (exists) {
              // Prevent adding new edge if one already exists from this source handle
              return eds;
            }
            return addEdge(
              {
                ...params,
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 30,
                  height: 30,
                },
              },
              eds
            );
          }),
      };

    return (
      <div className="h-screen flex flex-col">
        <HeaderSection edges={edges} nodes={nodes} />
        <div className="flex grow">
            <ReactFlowProvider>
                <div className="grow">
                <FlowContent
                  nodeTypes={nodeTypes}
                  nodes={nodes}
                  edges={edges}
                  selectedNodeId={selectedNodeId}
                  setSelectedNodeId={setSelectedNodeId}
                  {...handlers}
                />
                </div>
                <ActionPanel
                  setSelectedId={setSelectedNodeId}
                  selectedNodeId={selectedNodeId}
                  nodes={nodes}
                  setNodes={setNodes}
                />
            </ReactFlowProvider>
        </div>
      </div>
    );
  }
