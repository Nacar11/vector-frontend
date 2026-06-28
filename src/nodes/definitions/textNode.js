// definitions/textNode.js
// Auto-resizing text field (Part 3) + a left target handle per {{ variable }}.

import { parseTemplateVariables } from '../parseVariables';

export const textNode = {
  type: 'text',
  label: 'Text',
  title: 'Text',
  autoSize: true,
  fields: [
    { key: 'text', label: 'Text', type: 'autoTextarea', default: '{{input}}' },
  ],
  // Function form: one left target handle per unique variable, plus the output.
  // Variable handle ids are namespaced so `{{output}}` can't collide with it.
  handles: (data) => [
    ...parseTemplateVariables(data?.text).map((name) => ({
      id: `var-${name}`,
      type: 'target',
      position: 'left',
    })),
    { id: 'output', type: 'source', position: 'right' },
  ],
};
