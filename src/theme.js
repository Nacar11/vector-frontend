// theme.js
// Light/dark theme state. Single source of truth = one localStorage key, shared
// with the pre-paint snippet in public/index.html so the toggle and the DOM
// class never disagree (no flash, no clobber).

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'vs-theme';
const ThemeContext = createContext(undefined);

const isValidTheme = (value) => value === 'light' || value === 'dark';

export const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isValidTheme(stored)) return stored;
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
  return prefersDark ? 'dark' : 'light';
};

const applyThemeClass = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyThemeClass(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
