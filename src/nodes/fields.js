// fields.js
// Field-type registry for the node abstraction.
// A field definition is pure data; this module turns it into a labeled input
// that reads/writes through a single onChange callback (wired to the store by
// BaseNode). Add a new input type by adding one entry to `renderers`.

// Resolve a field's default, which may be a literal or a function of the node id.
export const resolveDefault = (field, id) =>
  typeof field.default === 'function' ? field.default(id) : field.default;

// Each renderer receives { field, id, data, value, onChange } and returns the
// control element. onChange is called with the new *value* (not the event).
const renderers = {
  text: ({ value, onChange }) => (
    <input
      type="text"
      className="vs-node__input"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  number: ({ value, onChange }) => (
    <input
      type="number"
      className="vs-node__input"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  textarea: ({ value, onChange }) => (
    <textarea
      className="vs-node__input vs-node__textarea"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
  select: ({ field, value, onChange }) => (
    <select
      className="vs-node__input"
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
      className="vs-node__checkbox"
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
    />
  ),
  // Escape hatch: a field can supply its own renderer.
  // Signature: render({ id, data, value, onChange }) => JSX
  custom: ({ field, id, data, value, onChange }) =>
    field.render?.({ id, data, value, onChange }) ?? null,
};

// Renders one labeled field row.
export const FieldRow = ({ field, id, data, value, onChange }) => {
  const renderer = renderers[field.type] ?? renderers.text;
  const control = renderer({ field, id, data, value, onChange });
  return (
    <label className={`vs-node__field vs-node__field--${field.type}`}>
      {field.label && <span className="vs-node__label">{field.label}</span>}
      {control}
    </label>
  );
};
