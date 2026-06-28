// definitions/apiNode.js
// Demonstrates: mixed field types with zero new infrastructure (pure config).

export const apiNode = {
  type: 'api',
  label: 'API Request',
  title: 'API Request',
  fields: [
    { key: 'url', label: 'URL', type: 'text', default: 'https://' },
    {
      key: 'method',
      label: 'Method',
      type: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      default: 'GET',
    },
  ],
  handles: [
    { id: 'body', type: 'target', position: 'left' },
    { id: 'response', type: 'source', position: 'right' },
  ],
};
