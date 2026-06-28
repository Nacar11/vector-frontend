// BaseNode.js
// Generic node renderer driven entirely by a node definition. Node visuals live
// here (single place to style all nodes). Field values read from / write to the
// store, so they're available to later parts.

import { useEffect } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import { FieldRow, resolveDefault } from './fields';
import { NodeHandles, buildHandleId } from './handles';
import { accentFor } from './accents';

export const BaseNode = ({ id, data, definition }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const pruneNodeEdges = useStore((state) => state.pruneNodeEdges);
  const updateNodeInternals = useUpdateNodeInternals();

  const { type, title, label, description, autoSize, fields = [], handles = [] } = definition;
  // handles may be a static array or a function of (data, id) — the escape hatch
  // that lets nodes (e.g. the Text node) compute handles dynamically.
  const resolvedHandles =
    typeof handles === 'function' ? handles(data, id) : handles;

  // When the handle set changes (e.g. Text-node variables), tell ReactFlow to
  // re-measure handle positions, and drop edges pointing at handles that vanished.
  const handleKey = resolvedHandles.map((h) => `${h.type}:${h.position}:${h.id}`).join('|');
  useEffect(() => {
    updateNodeInternals(id);
    pruneNodeEdges(id, resolvedHandles.map((h) => buildHandleId(id, h.id)));
    // handleKey captures the only relevant change; the store actions are stable refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleKey, id]);

  // Give nodes with several handles on one side room so they don't crowd.
  const leftCount = resolvedHandles.filter((h) => h.position === 'left').length;
  const rightCount = resolvedHandles.filter((h) => h.position === 'right').length;
  const maxSide = Math.max(leftCount, rightCount);
  const cardStyle = maxSide > 1 ? { minHeight: `${maxSide * 28}px` } : undefined;
  const widthClass = autoSize ? 'w-fit min-w-[14rem] max-w-[32rem]' : 'w-56';

  return (
    <div
      className={`vs-node-card vs-card ${widthClass} transition hover:shadow-lg`}
      style={cardStyle}
    >
      <div className={`rounded-t-xl px-3 py-2 text-sm font-semibold text-white ${accentFor(type)}`}>
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
