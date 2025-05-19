const React = require("react");

/**
 * Position item component that displays position details in an accordion
 * @param {Object} props
 * @param {import("../../tables/PositionTable.ts").Position} props.position - Position object
 */
const PositionItem = ({ position }) => {
  return (
    <details>
      <summary>
        <div>
          <strong>{position.title || "New position"}</strong>
          {position.company && (
            <span>
              &ensp;at <strong>{position.company}</strong>
            </span>
          )}
          {position.location && (
            <span>
              &ensp;in <strong>{position.location}</strong>
            </span>
          )}
        </div>
      </summary>
      <div>
        <article>
          <ul>
            <li>
              <strong>Job URL:</strong>{" "}
              <a href={position.url} target="_blank" rel="noopener noreferrer">
                {position.url}
              </a>
            </li>
            <li>
              <strong>Job Title:</strong> {position.title}
            </li>
            <li>
              <strong>Company:</strong> {position.company}
            </li>
            <li>
              <strong>Location:</strong> {position.location}
            </li>
            <li>
              <strong>Salary:</strong> {position.salary}
            </li>
            <li>
              <strong>Description:</strong> {position.description}
            </li>
          </ul>
          <footer role="group" style={{ width: "auto" }}>
            <a href={`/positions/${position.id}`} role="button">
              Edit
            </a>
          </footer>
        </article>
      </div>
    </details>
  );
};

module.exports = PositionItem;
