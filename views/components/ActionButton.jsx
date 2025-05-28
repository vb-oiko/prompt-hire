const React = require("react");

/**
 * Action button component that wraps a form with a submit button
 * @param {import("../../types/components.ts").ActionButtonProps} props
 * @returns {JSX.Element}
 */
const ActionButton = ({
  action,
  method = "POST",
  label,
  className = "primary",
  children,
  disabled = false,
}) => {
  return (
    <form method={method} action={action}>
      <button
        type="submit"
        className={className}
        disabled={disabled}
        style={{ minWidth: "5rem" }}
      >
        {label || children}
      </button>
    </form>
  );
};

module.exports = ActionButton;
