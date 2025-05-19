const React = require("react");
const ActionButton = require("./ActionButton");

/**
 * Position item component that displays position details in an accordion
 * @param {Object} props
 * @param {import("../../tables/PositionTable.ts").Position} props.position - Position object
 */
const PositionItem = ({ position }) => {
  return (
    <details>
      <summary>
        <div className="grid">
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
          <div
            role="group"
            style={{ width: "fit-content", marginLeft: "auto" }}
          >
            <ActionButton
              action={`/positions/${position.id}/parse`}
              label="Parse Description"
            />
            <ActionButton
              action={`/positions/${position.id}/optimize`}
              label="Optimize Resume"
            />
            <ActionButton
              action={`/positions/${position.id}/create-documents`}
              label="Create Documents"
              disabled={Boolean(position.optimizedResume)}
            />
            <ActionButton
              action={`/positions/${position.id}`}
              method="GET"
              label="Edit"
              className="secondary"
            />
          </div>
        </div>
      </summary>
      <div>
        <article>
          <header></header>
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
            {position.resumeUrl && (
              <li>
                <a
                  href={position.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Optimized Resume
                </a>
              </li>
            )}
            <li>
              <strong>Description:</strong> {position.description}
            </li>
            <li>
              <strong>Optimized Resume:</strong>
              <pre>{position.optimizedResume}</pre>
            </li>
          </ul>
        </article>
      </div>
    </details>
  );
};

module.exports = PositionItem;
