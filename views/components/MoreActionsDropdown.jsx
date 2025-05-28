const React = require("react");
const ActionButton = require("./ActionButton.jsx");

/**
 * @typedef {{
 *   actions: {
 *     label: string;
 *     action: string;
 *   }[];
 *   label?: string;
 * }} MoreActionsDropdownProps
 */

/**
 * Positions view component
 * @param {MoreActionsDropdownProps} props
 */
const MoreActionsDropdown = ({ actions = [], label = "More" }) => {
  return (
    <details className="dropdown">
      <summary>{label}</summary>
      <ul dir="rtl">
        {actions.map((action) => (
          <li key={action.label}>
            <ActionButton action={action.action} label={action.label} />
          </li>
        ))}
      </ul>
    </details>
  );
};

module.exports = MoreActionsDropdown;
