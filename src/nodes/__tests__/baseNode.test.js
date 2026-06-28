// baseNode.test.js
// Light coverage for the abstraction: default resolution, field rendering,
// and store write-through.

import { render, screen, fireEvent } from '@testing-library/react';
import { ReactFlowProvider } from 'reactflow';
import { BaseNode } from '../BaseNode';
import { resolveDefault } from '../fields';
import { useStore } from '../../store';

const renderNode = (definition, data) =>
  render(
    <ReactFlowProvider>
      <BaseNode id={data.id} data={data} definition={definition} />
    </ReactFlowProvider>
  );

beforeEach(() => {
  useStore.setState({ nodes: [], edges: [], nodeIDs: {} });
});

test('resolveDefault handles literal and function defaults', () => {
  expect(resolveDefault({ default: 'x' }, 'id-1')).toBe('x');
  expect(resolveDefault({ default: (id) => `n-${id}` }, 'id-1')).toBe('n-id-1');
});

test('renders one input per field', () => {
  const definition = {
    title: 'Test',
    fields: [
      { key: 'a', label: 'A', type: 'text', default: '' },
      { key: 'b', label: 'B', type: 'select', options: ['x', 'y'], default: 'x' },
    ],
    handles: [],
  };
  renderNode(definition, { id: 'test-1', a: '', b: 'x' });
  expect(screen.getByLabelText('A')).toBeInTheDocument();
  expect(screen.getByLabelText('B')).toBeInTheDocument();
});

test('editing a field writes through to the store', () => {
  useStore.setState({ nodes: [{ id: 'test-1', data: { id: 'test-1', name: '' } }] });
  const definition = {
    title: 'Test',
    fields: [{ key: 'name', label: 'Name', type: 'text', default: '' }],
    handles: [],
  };
  renderNode(definition, { id: 'test-1', name: '' });
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'hello' } });
  const node = useStore.getState().nodes.find((n) => n.id === 'test-1');
  expect(node.data.name).toBe('hello');
});
