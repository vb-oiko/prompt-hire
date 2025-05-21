const React = require("react");

/**
 * @typedef {{
 *   label: string;
 *   value: string;
 * }} DisplayPreFormattedFieldProps
 */

/**
 * Action button component that wraps a form with a submit button
 * @param {DisplayPreFormattedFieldProps} props
 * @returns {JSX.Element}
 */
const DisplayPreFormattedField = ({ label, value }) => {
  return (
    value && (
      <details>
        <summary>
          <strong>{label}:</strong> {value.slice(0, 50)}...
        </summary>
        <pre>{value}</pre>
      </details>
    )
  );
};

module.exports = DisplayPreFormattedField;
