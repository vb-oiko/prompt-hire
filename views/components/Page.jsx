const React = require("react");

/**
 * @typedef {{
 *   children: React.ReactNode;
 *   title?: string;
 *   headerContent?: React.ReactNode;
 * }} PageProps
 */

/**
 * Message form component
 * @param {PageProps} props
 * @returns {JSX.Element}
 */
const Page = ({ children, title, headerContent }) => {
  return (
    <article>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <div className="grid">{headerContent}</div>
      </header>
      {children}
    </article>
  );
};

module.exports = Page;
