// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

// Brand-colored edges read well on both light and dark canvases.
const EDGE_COLOR = '#6366f1';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({
          ...connection,
          type: 'smoothstep',
          animated: true,
          style: { stroke: EDGE_COLOR, strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: EDGE_COLOR, height: 18, width: 18 },
        }, get().edges),
      });
    },
    // Returns a fresh node object instead of mutating node.data in place, so
    // ReactFlow/zustand consumers reliably see the change.
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
            : node
        ),
      });
    },
    // Drop edges attached to a node via a handle that no longer exists (e.g. a
    // Text-node variable handle that was deleted). No-op if nothing changed.
    pruneNodeEdges: (nodeId, validHandleIds) => {
      const valid = new Set(validHandleIds);
      const edges = get().edges;
      const next = edges.filter((edge) => {
        if (edge.source === nodeId && edge.sourceHandle && !valid.has(edge.sourceHandle)) return false;
        if (edge.target === nodeId && edge.targetHandle && !valid.has(edge.targetHandle)) return false;
        return true;
      });
      if (next.length !== edges.length) {
        set({ edges: next });
      }
    },
  }));
