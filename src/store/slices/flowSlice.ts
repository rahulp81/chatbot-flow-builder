import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  MarkerType,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNodes: string[];
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  selectedNodes: [],
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<Node[]>) {
      // Clean domAttributes before setting nodes to avoid Immer issues
      state.nodes = action.payload.map(({ domAttributes, ...node }) => ({
        ...node,
      }));
    },
    setEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    onNodesChange(state, action: PayloadAction<NodeChange<Node>[]>) {
      // applyNodeChanges returns new array, so we clean domAttributes again
      const updatedNodes = applyNodeChanges(action.payload, state.nodes);
      state.nodes = updatedNodes.map(({ domAttributes, ...node }) => ({
        ...node,
      }));
    },
    onEdgesChange(state, action: PayloadAction<EdgeChange<Edge>[]>) {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect(state, action: PayloadAction<Connection>) {
      const newEdge = {
        ...action.payload,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 30,
          height: 30,
        },
      };
      state.edges = addEdge(newEdge, state.edges);
    },
    setSelectedNodes(state, action: PayloadAction<string[]>) {
      state.selectedNodes = action.payload;
    },
  },
});

export const {
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelectedNodes,
} = flowSlice.actions;

const flowReducer = flowSlice.reducer;

export default flowReducer;
