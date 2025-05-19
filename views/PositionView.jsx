const React = require("react");
const Layout = require("./components/Layout");
const InputField = require("./components/InputField");

/**
 * Position detail view component
 * @param {import("./types.ts").PositionView} props
 * @returns {JSX.Element}
 */
const PositionView = ({ position = {}, mode = "edit" }) => {
  const isCreateMode = mode === "create";
  const title = isCreateMode
    ? "Create Position"
    : `Edit: ${position.title || ""}`;

  return (
    <Layout title={`${title} - PromptHire`}>
      <article>
        <header>
          <h1>{title}</h1>
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
            </>
          )}

          {/* <InputField
            name="tags"
            label="Tags"
            placeholder="Comma-separated tags"
            defaultValue={position.tags || ""}
          /> */}

          <footer role="group" style={{ width: "auto" }}>
            <button type="submit">
              {isCreateMode ? "Create Position" : "Save Changes"}
            </button>

            <a href="/positions" role="button" className="secondary">
              Cancel
            </a>

            {!isCreateMode && (
              <a
                href={`/positions/${position.id}/delete`}
                role="button"
                className="contrast"
              >
                Delete
              </a>
            )}
          </footer>
        </form>
      </article>
    </Layout>
  );
};

module.exports = PositionView;
