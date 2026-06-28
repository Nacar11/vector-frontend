// store.test.js

import { useStore } from './store';

beforeEach(() => {
  useStore.setState({ nodes: [], edges: [], nodeIDs: {} });
});

test('pruneNodeEdges removes edges whose handle on the node no longer exists', () => {
  useStore.setState({
    edges: [
      { id: 'e1', source: 'a', target: 'text-1', sourceHandle: 'a-output', targetHandle: 'text-1-var-x' },
      { id: 'e2', source: 'a', target: 'text-1', sourceHandle: 'a-output', targetHandle: 'text-1-var-y' },
    ],
  });

  // Only var-y (and output) remain valid on text-1.
  useStore.getState().pruneNodeEdges('text-1', ['text-1-var-y', 'text-1-output']);

  expect(useStore.getState().edges.map((e) => e.id)).toEqual(['e2']);
});

test('pruneNodeEdges leaves edges on other nodes untouched', () => {
  useStore.setState({
    edges: [{ id: 'e1', source: 'other', target: 'b', sourceHandle: 'other-output', targetHandle: 'b-value' }],
  });

  useStore.getState().pruneNodeEdges('text-1', []);

  expect(useStore.getState().edges.map((e) => e.id)).toEqual(['e1']);
});

test('pruneNodeEdges is a no-op (same array reference) when nothing changes', () => {
  const edges = [
    { id: 'e1', source: 'text-1', target: 'b', sourceHandle: 'text-1-output', targetHandle: 'b-value' },
  ];
  useStore.setState({ edges });

  useStore.getState().pruneNodeEdges('text-1', ['text-1-output']);

  expect(useStore.getState().edges).toBe(edges);
});
