// AutoResizeTextarea.js
// A textarea that grows in both height (to fit wrapped/added lines) and width
// (to fit the longest line), within sensible bounds.

import { useLayoutEffect, useRef } from 'react';

const MIN_COLS = 16;
const MAX_COLS = 48;

export const AutoResizeTextarea = ({ value, onChange, className }) => {
  const ref = useRef(null);
  const text = String(value ?? '');

  // Height: reset then grow to content.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  // Width: longest line, clamped. Approximate on proportional fonts but fine for
  // visibility; the node card grows to fit via its w-fit/max-w bounds.
  const longestLine = text.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
  const cols = Math.min(MAX_COLS, Math.max(MIN_COLS, longestLine + 1));

  return (
    <textarea
      ref={ref}
      className={className}
      style={{ width: `${cols}ch` }}
      rows={1}
      value={text}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
