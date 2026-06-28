// definitions/llmNode.js
// Demonstrates: no fields, a static description, and multiple input handles
// that the abstraction auto-distributes down the left side.

export const llmNode = {
  type: 'llm',
  label: 'LLM',
  title: 'LLM',
  description: 'This is a LLM.',
  handles: [
    { id: 'system', type: 'target', position: 'left' },
    { id: 'prompt', type: 'target', position: 'left' },
    { id: 'response', type: 'source', position: 'right' },
  ],
};
