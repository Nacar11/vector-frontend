// parseVariables.js
// Extracts unique {{ variable }} names from text, where a variable is a valid
// JavaScript identifier. Returns them in first-appearance order.

export const parseTemplateVariables = (text) => {
  if (!text) return [];
  // Built per call so the global regex's lastIndex never leaks between calls.
  const re = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
  const seen = new Set();
  const names = [];
  for (const match of String(text).matchAll(re)) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      names.push(name);
    }
  }
  return names;
};
