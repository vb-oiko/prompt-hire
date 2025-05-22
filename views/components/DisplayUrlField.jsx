const React = require("react");

/**
 * @typedef {{
 *   label: string;
 *   value: string;
 * }} DisplayUrlFieldProps
 */

/**
 * Action button component that wraps a form with a submit button
 * @param {DisplayUrlFieldProps} props
 * @returns {JSX.Element}
 */
const DisplayUrlField = ({ label, value }) => {
  return (
    value && (
      <div>
        <a href={value} target="_blank" rel="noopener noreferrer">
          {label}🔗
        </a>
      </div>
    )
  );
};

module.exports = DisplayUrlField;
