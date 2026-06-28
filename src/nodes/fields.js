// fields.js
// Field-type registry for the node abstraction. A field definition is pure data;
// this module turns it into a labeled input that reads/writes through a single
// onChange callback (wired to the store by BaseNode). Add an input type by adding
// one entry to `renderers`.

import { AutoResizeTextarea } from './AutoResizeTextarea';

// Resolve a field's default, which may be a literal or a function of the node id.
export const resolveDefault = (field, id) =>
  typeof field.default === 'function' ? field.default(id) : field.default;

// Each renderer receives { field, id, data, value, onChange } and returns the
// control element. onChange is called with the new *value* (not the event).
const renderers = {
  text: ({ value, onChange }) => (
    <input
      type="text"
      className="vs-input"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  number: ({ value, onChange }) => (
    <input
      type="number"
      className="vs-input"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  textarea: ({ value, onChange }) => (
    <textarea
      className="vs-input min-h-[48px] resize-y"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  // Auto-resizing textarea (grows in width and height) — used by the Text node.
  autoTextarea: ({ value, onChange }) => (
    <AutoResizeTextarea
      className="vs-input resize-none overflow-hidden"
      value={value}
      onChange={onChange}
    />
  ),
  select: ({ field, value, onChange }) => (
    <select
      className="vs-input"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    >
      {(field.options ?? []).map((opt) => {
        const { value: v, label: l } =
          typeof opt === 'string' ? { value: opt, label: opt } : opt;
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
    </select>
  ),
  checkbox: ({ value, onChange }) => (
    <input
      type="checkbox"
      className="h-4 w-4 accent-brand-600"
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
    />
  ),
};

// Renders one labeled field row. The control stays wrapped in the <label> so its
// accessible name is the field label (keeps getByLabelText working).
export const FieldRow = ({ field, id, data, value, onChange }) => {
  const renderer = renderers[field.type] ?? renderers.text;
  const control = renderer({ field, id, data, value, onChange });
  const isCheckbox = field.type === 'checkbox';

  return (
    <label
      className={`flex ${isCheckbox ? 'items-center' : 'flex-col'} gap-1 text-xs font-medium text-slate-600 dark:text-slate-300`}
    >
      {isCheckbox ? (
        <>
          {control}
          {field.label && <span>{field.label}</span>}
        </>
      ) : (
        <>
          {field.label && <span>{field.label}</span>}
          {control}
        </>
      )}
    </label>
  );
};
