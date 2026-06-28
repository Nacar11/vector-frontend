// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeDefinitions } from './nodes/nodeRegistry';

export const PipelineToolbar = () => {
  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900">
      {nodeDefinitions.map((def) => (
        <DraggableNode key={def.type} type={def.type} label={def.label} />
      ))}
    </div>
  );
};
