// BaseNode.js
// Generic node renderer driven entirely by a node definition.
// It knows nothing about specific node types; definitions know nothing about
// rendering. Field values are read from / written to the store (single source
// of truth), so they're available to later parts (variables, submit).

import { useStore } from '../store';
import { FieldRow, resolveDefault } from './fields';
import { NodeHandles } from './handles';
import '../nodes.css';

export const BaseNode = ({ id, data, definition }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const { title, label, description, fields = [], handles = [] } = definition;
  // handles may be a static array or a function of (data, id) — the escape hatch
  // that lets nodes (e.g. the Text node in Part 3) compute handles dynamically.
  const resolvedHandles =
    typeof handles === 'function' ? handles(data, id) : handles;

  return (
    <div className="vs-node">
      <div className="vs-node__title">{title ?? label}</div>

      {description && <div className="vs-node__description">{description}</div>}

      {fields.length > 0 && (
        <div className="vs-node__body">
          {fields.map((field) => (
            <FieldRow
              key={field.key}
              field={field}
              id={id}
              data={data}
              value={data?.[field.key] ?? resolveDefault(field, id)}
              onChange={(value) => updateNodeField(id, field.key, value)}
            />
          ))}
        </div>
      )}

      <NodeHandles nodeId={id} handles={resolvedHandles} />
    </div>
  );
};
