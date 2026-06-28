// definitions/inputNode.js
// A node is just data. This is the entire Input node.

export const inputNode = {
  type: 'customInput',
  label: 'Input',
  title: 'Input',
  fields: [
    {
      key: 'inputName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('customInput-', 'input_'),
    },
    {
      key: 'inputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'File'],
      default: 'Text',
    },
  ],
  handles: [{ id: 'value', type: 'source', position: 'right' }],
};
