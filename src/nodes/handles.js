// handles.js
// Helpers for rendering a node's connection handles from its definition.
// Handles sharing a side are auto-distributed so we never hand-tune percentages.

import { Handle, Position } from 'reactflow';

const POSITION_MAP = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

// Full ReactFlow handle id. Keeps the existing `${nodeId}-${handleId}` convention
// so edges connected to migrated nodes keep working.
export const buildHandleId = (nodeId, handleId) => `${nodeId}-${handleId}`;

// Renders all handles for a node, distributing those on the same side evenly:
// handle i of n on a side sits at (i+1)/(n+1) along that side.
export const NodeHandles = ({ nodeId, handles = [] }) => {
  const byPosition = handles.reduce((acc, handle) => {
    (acc[handle.position] ??= []).push(handle);
    return acc;
  }, {});

  return handles.map((handle) => {
    const group = byPosition[handle.position];
    const index = group.indexOf(handle);
    const offset = `${((index + 1) / (group.length + 1)) * 100}%`;
    const isVertical = handle.position === 'left' || handle.position === 'right';
    const layout = isVertical ? { top: offset } : { left: offset };

    return (
      <Handle
        key={`${handle.type}-${handle.id}`}
        type={handle.type}
        position={POSITION_MAP[handle.position] ?? Position.Left}
        id={buildHandleId(nodeId, handle.id)}
        style={{ ...layout, ...(handle.style || {}) }}
      />
    );
  });
};
