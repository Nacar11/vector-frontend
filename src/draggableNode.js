// draggableNode.js

import { accentFor } from './nodes/accents';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="flex cursor-grab select-none items-center gap-2 rounded-lg border border-slate-200
        bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition
        hover:border-brand-400 hover:shadow active:cursor-grabbing
        dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span className={`h-2.5 w-2.5 rounded-full ${accentFor(type)}`} aria-hidden="true" />
      {label}
    </div>
  );
};
