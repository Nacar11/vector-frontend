// definitions/conditionalNode.js
// Demonstrates: multiple output handles (true/false), auto-distributed on the right.

export const conditionalNode = {
  type: 'conditional',
  label: 'Conditional',
  title: 'Conditional',
  fields: [
    { key: 'condition', label: 'Condition', type: 'text', default: '' },
  ],
  handles: [
    { id: 'input', type: 'target', position: 'left' },
    { id: 'true', type: 'source', position: 'right' },
    { id: 'false', type: 'source', position: 'right' },
  ],
};
