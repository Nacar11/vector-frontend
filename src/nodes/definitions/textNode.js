// definitions/textNode.js
// Uses a textarea (sets up Part 3's auto-resize). Part 3 will swap `handles`
// for the function form to render a handle per {{variable}} in the text.

export const textNode = {
  type: 'text',
  label: 'Text',
  title: 'Text',
  fields: [
    { key: 'text', label: 'Text', type: 'textarea', default: '{{input}}' },
  ],
  handles: [{ id: 'output', type: 'source', position: 'right' }],
};
