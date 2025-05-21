const React = require("react");
const Layout = require("./components/Layout.jsx");

/**
 * @typedef {{
 *   positions: import("../tables/PositionTable.ts").Position[];
 * }} ListPositionsProps
 */

/**
 * Positions view component
 * @param {ListPositionsProps} props
 */
const ListPositions = ({ positions = [] }) => {
  return (
    <Layout title="Positions List">
      <article>
        <header style={{ display: "flex", justifyContent: "end" }}>
          <a href="/positions/new" role="button">
            Add Position
          </a>
        </header>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <p>List of positions will be shown here.</p>
            ) : (
              positions.map((position) => (
                <tr key={position.id}>
                  <td>
                    <a href={`/positions/${position.id}`}>{position.title}</a>
                  </td>
                  <td>{position.company}</td>
                  <td>{position.location}</td>
                  <td>{position.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </article>
    </Layout>
  );
};

module.exports = ListPositions;
