const React = require("react");
const Layout = require("./components/Layout");

/**
 * Positions view component
 * @param {Object} props
 * @param {import("../tables/PositionTable.ts").Position[]} props.positions - Array of position objects
 */
const PositionsView = ({ positions = [] }) => {
  return (
    <Layout title="Open Positions - PromptHire">
      <article>
        <header className="grid">
          <div>
            <h1>Open Positions</h1>
          </div>
          <div className="text-right">
            <a href="/positions/new" role="button" className="outline">
              Add Position
            </a>
          </div>
        </header>
        {positions.length === 0 ? (
          <p>List of positions will be shown here.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.id}>
                  <td>
                    <a
                      href={position.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {position.url}
                    </a>
                  </td>
                  <td>{position.title}</td>
                  <td>{position.company}</td>
                  <td>{position.location}</td>
                  <td>{position.status}</td>
                  <td>
                    <div role="group">
                      <a href={`/positions/${position.id}`} role="button">
                        Edit
                      </a>
                      <a
                        href={`/positions/${position.id}/delete`}
                        role="button"
                        className="secondary"
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </article>
    </Layout>
  );
};

module.exports = PositionsView;
