// accents.js
// Static, literal Tailwind class strings per node type. Kept as full literals so
// Tailwind's content scanner can see them (never build these names dynamically).
// Shades are chosen so white title text meets WCAG AA contrast (>= 3:1 for the
// large/bold title) on the accent fill.

export const NODE_ACCENTS = {
  customInput: 'bg-sky-600',
  customOutput: 'bg-rose-600',
  llm: 'bg-brand-600',
  text: 'bg-violet-600',
  math: 'bg-indigo-600',
  filter: 'bg-emerald-700',
  api: 'bg-cyan-700',
  note: 'bg-amber-700',
  conditional: 'bg-fuchsia-600',
};

export const DEFAULT_ACCENT = 'bg-slate-600';

export const accentFor = (type) => NODE_ACCENTS[type] ?? DEFAULT_ACCENT;
