const React = require("react");

/**
 * @typedef {{
 *   label?: string;
 *   name: string;
 *   defaultValue?: string;
 *   disabled?: boolean;
 *   required?: boolean;
 *   placeholder?: string;
 *   options: { label: string; value: string }[];
 * }} SelectFieldProps
 */

/**
 * Input field component
 * @param {SelectFieldProps} props
 * @returns {JSX.Element}
 */
const SelectField = ({
  name,
  label,
  defaultValue = "",
  disabled = false,
  required = false,
  placeholder = "",
  options,
}) => {
  const id = `field-${name}`;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && " *"}
        </label>
      )}
      <select
        name={name}
        aria-label={label}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        <option selected disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

module.exports = SelectField;
