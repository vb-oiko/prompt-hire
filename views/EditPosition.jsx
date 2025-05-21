const React = require("react");
const Layout = require("./components/Layout.jsx");
const InputField = require("./components/InputField.jsx");
const ActionButton = require("./components/ActionButton.jsx");

/**
 * @typedef {{
 *   position: import("../tables/PositionTable.ts").Position;
 *   mode: "edit" | "create";
 * }} EditPositionProps
 */

/**
 * Position detail view component
 * @param {EditPositionProps} props
 * @returns {JSX.Element}
 */
const EditPosition = ({ position = {}, mode = "edit" }) => {
  const isCreateMode = mode === "create";
  const title = isCreateMode
    ? "Create Position"
    : `Edit: ${position.title || ""}`;

  return (
    <Layout title={`${title} - PromptHire`}>
      <article>
        <header>
          <h3>{title}</h3>
        </header>

        <form
          method="POST"
          action={isCreateMode ? "/positions" : `/positions/${position.id}`}
        >
          <InputField
            name="url"
            label="Job URL"
            type="url"
            defaultValue={position.url || ""}
            required
          />

          <InputField
            name="description"
            label="Description"
            type="textarea"
            defaultValue={position.description || ""}
            required
          />

          {!isCreateMode && (
            <>
              <InputField
                name="title"
                label="Job Title"
                defaultValue={position.title || ""}
              />

              <InputField
                name="company"
                label="Company"
                defaultValue={position.company || ""}
              />

              <InputField
                name="location"
                label="Location"
                defaultValue={position.location || ""}
              />

              <InputField
                name="salary"
                label="Salary"
                defaultValue={position.salary || ""}
              />

              <InputField
                name="skills"
                label="Skills"
                defaultValue={position.skills || ""}
              />
            </>
          )}

          <footer role="group" style={{ width: "auto" }}>
            <button type="submit">
              {isCreateMode ? "Create Position" : "Save Changes"}
            </button>

            <a
              href={isCreateMode ? "/positions" : `/positions/${position.id}`}
              role="button"
              className="secondary"
            >
              Cancel
            </a>
          </footer>
        </form>
      </article>
    </Layout>
  );
};

module.exports = EditPosition;
