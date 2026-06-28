// nodeRegistry.js
// Single source of truth for all node types. Adding a node = import its
// definition and add it to `nodeDefinitions`. Everything else (the ReactFlow
// node component, the toolbar chip, the initial store data) is derived here.

import { BaseNode } from './BaseNode';
import { resolveDefault } from './fields';

import { inputNode } from './definitions/inputNode';
import { outputNode } from './definitions/outputNode';
import { llmNode } from './definitions/llmNode';
import { textNode } from './definitions/textNode';
import { mathNode } from './definitions/mathNode';
import { filterNode } from './definitions/filterNode';
import { apiNode } from './definitions/apiNode';
import { noteNode } from './definitions/noteNode';
import { conditionalNode } from './definitions/conditionalNode';

export const nodeDefinitions = [
  inputNode,
  outputNode,
  llmNode,
  textNode,
  mathNode,
  filterNode,
  apiNode,
  noteNode,
  conditionalNode,
];

const definitionsByType = Object.fromEntries(
  nodeDefinitions.map((def) => [def.type, def])
);

// Built once at module load and kept stable — ReactFlow requires nodeTypes to
// be a constant reference, otherwise it remounts nodes on every render.
export const nodeTypes = Object.fromEntries(
  nodeDefinitions.map((def) => [
    def.type,
    (props) => <BaseNode {...props} definition={def} />,
  ])
);

// Seed a new node's data with each field's resolved default so values exist in
// the store from creation (ready for later parts), not only after first edit.
export const buildInitialData = (id, type) => {
  const definition = definitionsByType[type];
  const data = { id, nodeType: type };
  (definition?.fields ?? []).forEach((field) => {
    data[field.key] = resolveDefault(field, id);
  });
  return data;
};
