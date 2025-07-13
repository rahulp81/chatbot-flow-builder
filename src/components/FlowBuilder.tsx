import HeaderSection from "@/components/HeaderSection";
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Controls,
  MiniMap,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ActionPanel from "@/components/ActionPanel";
import SendMessageNode from "./Nodes/SendMessageNode";

const nodeTypes = {
    sendMessage: SendMessageNode,
};

const initialNodes: Node[] = [
  { id: 'n1',type : 'sendMessage' , position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2',type : 'sendMessage' ,position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges: Edge[] = [
  { id: 'n1->n2', source: 'n1', target: 'n2', markerEnd : {type: MarkerType.ArrowClosed , width : 25 , height : 25} },
];

export default function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div className="h-screen flex flex-col">
      <HeaderSection/>
      <div className="flex grow">
        <div className="grow">
            <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            >
              <Controls />
              <MiniMap />
            </ReactFlow>
        </div>
        <ActionPanel/>
      </div>
    </div>
  );
}
