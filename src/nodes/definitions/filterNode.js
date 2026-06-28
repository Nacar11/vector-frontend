// definitions/filterNode.js
// Demonstrates: the checkbox field type + a simple passthrough.

export const filterNode = {
  type: 'filter',
  label: 'Filter',
  title: 'Filter',
  fields: [
    { key: 'condition', label: 'Condition', type: 'text', default: '' },
    { key: 'caseSensitive', label: 'Case sensitive', type: 'checkbox', default: false },
  ],
  handles: [
    { id: 'input', type: 'target', position: 'left' },
    { id: 'output', type: 'source', position: 'right' },
  ],
};
