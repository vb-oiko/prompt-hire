const React = require("react");

/**
 * Input field component
 * @param {import("../../types/components.ts").InputFieldProps} props
 * @returns {JSX.Element}
 */
const InputField = ({
  name,
  label,
  type = "text",
  defaultValue = "",
  disabled = false,
  required = false,
  placeholder = "",
  onChange,
}) => {
  const id = `field-${name}`;

  if (type === "textarea") {
    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}
          {required && " *"}
        </label>
        <textarea
          id={id}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

module.exports = InputField;
