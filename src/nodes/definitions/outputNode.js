// definitions/outputNode.js

export const outputNode = {
  type: 'customOutput',
  label: 'Output',
  title: 'Output',
  fields: [
    {
      key: 'outputName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      key: 'outputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'Image'],
      default: 'Text',
    },
  ],
  handles: [{ id: 'value', type: 'target', position: 'left' }],
};
