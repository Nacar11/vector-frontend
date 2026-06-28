// definitions/mathNode.js
// Demonstrates: number fields + multiple input handles.

export const mathNode = {
  type: 'math',
  label: 'Math',
  title: 'Math',
  fields: [
    { key: 'a', label: 'A', type: 'number', default: 0 },
    { key: 'b', label: 'B', type: 'number', default: 0 },
    {
      key: 'operator',
      label: 'Operator',
      type: 'select',
      options: ['+', '-', '×', '÷'],
      default: '+',
    },
  ],
  handles: [
    { id: 'a', type: 'target', position: 'left' },
    { id: 'b', type: 'target', position: 'left' },
    { id: 'result', type: 'source', position: 'right' },
  ],
};
