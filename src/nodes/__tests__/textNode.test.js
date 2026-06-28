// textNode.test.js

import { textNode } from '../definitions/textNode';

test('creates a left target handle per variable, plus the output source', () => {
  expect(textNode.handles({ text: '{{a}} and {{b}}' })).toEqual([
    { id: 'var-a', type: 'target', position: 'left' },
    { id: 'var-b', type: 'target', position: 'left' },
    { id: 'output', type: 'source', position: 'right' },
  ]);
});

test('no variables -> only the output handle', () => {
  expect(textNode.handles({ text: 'plain text' })).toEqual([
    { id: 'output', type: 'source', position: 'right' },
  ]);
});

test('a variable named "output" does not collide with the output handle', () => {
  const ids = textNode.handles({ text: '{{output}}' }).map((h) => h.id);
  expect(ids).toEqual(['var-output', 'output']);
});
