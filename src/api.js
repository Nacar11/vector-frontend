// api.js
// Thin client for the backend. Base URL is overridable via REACT_APP_API_BASE.

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

export async function parsePipeline(nodes, edges) {
  const response = await fetch(`${API_BASE}/pipelines/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });
  if (!response.ok) {
    throw new Error(`Backend responded ${response.status}`);
  }
  return response.json();
}
