// BaseNode.js
// Generic node renderer driven entirely by a node definition. Node visuals live
// here (single place to style all nodes). Field values read from / write to the
// store, so they're available to later parts.

import { useStore } from '../store';
import { FieldRow, resolveDefault } from './fields';
import { NodeHandles } from './handles';
import { accentFor } from './accents';

export const BaseNode = ({ id, data, definition }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const { type, title, label, description, fields = [], handles = [] } = definition;
  // handles may be a static array or a function of (data, id) — the escape hatch
  // that lets nodes (e.g. the Text node in Part 3) compute handles dynamically.
  const resolvedHandles =
    typeof handles === 'function' ? handles(data, id) : handles;

  return (
    <div className="vs-node-card w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-node transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className={`px-3 py-2 text-sm font-semibold text-white ${accentFor(type)}`}>
        {title ?? label}
      </div>

      {description && (
        <div className="px-3 pt-2 text-xs text-slate-500 dark:text-slate-400">{description}</div>
      )}

      {fields.length > 0 && (
        <div className="flex flex-col gap-2 p-3">
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
