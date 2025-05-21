const React = require("react");

/**
 * @typedef {{
 *   label: string;
 *   value: string;
 * }} DisplayFieldProps
 */

/**
 * Action button component that wraps a form with a submit button
 * @param {DisplayFieldProps} props
 * @returns {JSX.Element}
 */
const DisplayField = ({ label, value }) => {
  return (
    value && (
      <div>
        <strong>{label}:</strong> {value}
      </div>
    )
  );
};

module.exports = DisplayField;
