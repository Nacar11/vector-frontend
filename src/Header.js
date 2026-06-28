// Header.js
// Branding bar: logo/name on the left, theme toggle + Submit on the right.

import { ThemeToggle } from './ThemeToggle';
import { SubmitButton } from './submit';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
          VS
        </span>
        <span className="text-base font-semibold text-slate-800 dark:text-slate-100">VectorShift</span>
        <span className="hidden text-sm text-slate-400 sm:inline">Pipeline Builder</span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <SubmitButton />
      </div>
    </header>
  );
};
