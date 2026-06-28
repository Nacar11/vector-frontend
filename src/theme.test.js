// theme.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme, getInitialTheme } from './theme';

const Consumer = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>theme:{theme}</button>;
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('getInitialTheme falls back safely for an invalid stored value', () => {
  localStorage.setItem('vs-theme', 'banana');
  expect(['light', 'dark']).toContain(getInitialTheme());
});

test('initializes from a valid stored theme and applies the class', () => {
  localStorage.setItem('vs-theme', 'dark');
  render(
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>
  );
  expect(screen.getByRole('button')).toHaveTextContent('theme:dark');
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});

test('toggle flips theme, the document class, and persistence', () => {
  localStorage.setItem('vs-theme', 'light');
  render(
    <ThemeProvider>
      <Consumer />
    </ThemeProvider>
  );
  expect(document.documentElement.classList.contains('dark')).toBe(false);

  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByRole('button')).toHaveTextContent('theme:dark');
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  expect(localStorage.getItem('vs-theme')).toBe('dark');
});
