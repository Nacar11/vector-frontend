// definitions/noteNode.js
// Demonstrates: a node with NO handles (handles are optional).

export const noteNode = {
  type: 'note',
  label: 'Note',
  title: 'Note',
  fields: [
    { key: 'note', label: 'Note', type: 'textarea', default: 'Write a note...' },
  ],
  handles: [],
};
