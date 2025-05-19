const React = require("react");
const Layout = require("./components/Layout");
const PositionItem = require("./components/PositionItem");

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
          <h1> Positions</h1>
          <a href="/positions/new" role="button" style={{ marginLeft: "auto" }}>
            Add Position
          </a>
        </header>
        {positions.length === 0 ? (
          <p>List of positions will be shown here.</p>
        ) : (
          positions.map((position) => (
            <PositionItem key={position.id} position={position} />
          ))
        )}
      </article>
    </Layout>
  );
};

module.exports = PositionsView;
