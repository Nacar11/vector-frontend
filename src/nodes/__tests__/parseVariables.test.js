// parseVariables.test.js

import { parseTemplateVariables } from '../parseVariables';

test('returns [] for empty / nullish input', () => {
  expect(parseTemplateVariables('')).toEqual([]);
  expect(parseTemplateVariables(undefined)).toEqual([]);
  expect(parseTemplateVariables(null)).toEqual([]);
  expect(parseTemplateVariables('no variables here')).toEqual([]);
});

test('extracts a single variable, trimming inner whitespace', () => {
  expect(parseTemplateVariables('hello {{ name }}')).toEqual(['name']);
  expect(parseTemplateVariables('{{name}}')).toEqual(['name']);
  expect(parseTemplateVariables('{{   spaced   }}')).toEqual(['spaced']);
});

test('extracts multiple variables in first-appearance order', () => {
  expect(parseTemplateVariables('{{a}} then {{b}} then {{c}}')).toEqual(['a', 'b', 'c']);
});

test('dedupes repeated variables', () => {
  expect(parseTemplateVariables('{{x}} and {{x}} again')).toEqual(['x']);
});

test('accepts $ and _ in identifiers', () => {
  expect(parseTemplateVariables('{{ _priv }} {{ $ref }} {{ a1 }}')).toEqual(['_priv', '$ref', 'a1']);
});

test('ignores invalid identifiers', () => {
  expect(parseTemplateVariables('{{1abc}} {{a-b}} {{ }} {{}} {{a.b}}')).toEqual([]);
});

test('is stateless across calls (no leaked regex lastIndex)', () => {
  expect(parseTemplateVariables('{{a}}')).toEqual(['a']);
  expect(parseTemplateVariables('{{a}}')).toEqual(['a']);
});
