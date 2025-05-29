const React = require("react");

/**
 * @typedef {{
 *   label: string;
 *   href: string;
 *   variant?: "primary" | "secondary";
 *   disabled?: boolean;
 * }} LinkButtonProps
 */

/**
 * Action button component that wraps a form with a submit button
 * @param {LinkButtonProps} props
 * @returns {JSX.Element}
 */
const LinkButton = ({ label, href, variant = "primary", disabled = false }) => {
  return disabled ? (
    <button className={`${variant} min-w-20`} disabled>
      {label}
    </button>
  ) : (
    <a
      href={href}
      role="button"
      className={`h-min-content ${variant} min-w-20`}
    >
      {label}
    </a>
  );
};

module.exports = LinkButton;
