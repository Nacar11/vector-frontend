// submit.test.js

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SubmitButton } from './submit';
import { useStore } from './store';

let alertSpy;

beforeEach(() => {
  useStore.setState({ nodes: [], edges: [], nodeIDs: {} });
  global.fetch = jest.fn();
  alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('guards against an empty pipeline (no request, prompts user)', () => {
  render(<SubmitButton />);
  fireEvent.click(screen.getByRole('button'));

  expect(global.fetch).not.toHaveBeenCalled();
  expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Add at least one node'));
});

test('posts the pipeline and alerts counts + DAG verdict', async () => {
  useStore.setState({
    nodes: [{ id: 'n1' }, { id: 'n2' }],
    edges: [{ id: 'e1', source: 'n1', target: 'n2' }],
  });
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ num_nodes: 2, num_edges: 1, is_dag: true }),
  });

  render(<SubmitButton />);
  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => expect(alertSpy).toHaveBeenCalled());
  const message = alertSpy.mock.calls[0][0];
  expect(message).toContain('Nodes: 2');
  expect(message).toContain('Edges: 1');
  expect(message).toContain('Yes');
});

test('shows an error alert when the request fails', async () => {
  useStore.setState({ nodes: [{ id: 'n1' }], edges: [] });
  global.fetch.mockRejectedValue(new Error('network down'));

  render(<SubmitButton />);
  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => expect(alertSpy).toHaveBeenCalled());
  expect(alertSpy.mock.calls[0][0]).toContain('Could not reach the backend');
});
