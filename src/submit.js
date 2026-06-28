// submit.js
// Sends the pipeline to the backend and alerts the result.

import { useState } from 'react';
import { useStore } from './store';
import { parsePipeline } from './api';

const formatResult = ({ num_nodes, num_edges, is_dag }) =>
  [
    'Pipeline parsed:',
    `• Nodes: ${num_nodes}`,
    `• Edges: ${num_edges}`,
    `• Valid DAG: ${is_dag ? 'Yes ✅' : 'No ❌'}`,
  ].join('\n');

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      window.alert('Add at least one node to the pipeline before submitting.');
      return;
    }
    setSubmitting(true);
    try {
      const result = await parsePipeline(nodes, edges);
      window.alert(formatResult(result));
    } catch (error) {
      window.alert(`Could not reach the backend. Make sure it's running.\n\n(${error.message})`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button type="button" className="vs-btn" onClick={handleSubmit} disabled={submitting}>
      {submitting ? 'Submitting…' : 'Submit'}
    </button>
  );
};
