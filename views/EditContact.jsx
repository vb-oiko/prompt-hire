const React = require("react");
const Layout = require("./components/Layout.jsx");
const InputField = require("./components/InputField.jsx");

/**
 * @typedef {{
 *   contact: import("../tables/ContactTable.ts").Contact;
 *   mode: "edit" | "create";
 *   positionId: number;
 * }} EditContactProps
 */

/**
 * Position detail view component
 * @param {EditContactProps} props
 * @returns {JSX.Element}
 */
const EditContact = ({ contact, mode = "edit", positionId }) => {
  const isCreateMode = mode === "create";
  const title = isCreateMode
    ? "Create Contact"
    : `Edit: ${contact.firstName} ${contact.lastName}`;

  return (
    <Layout title={`${title} - PromptHire`}>
      <article>
        <header>
          <h3>{title}</h3>
        </header>

        <form
          method="POST"
          action={`/contacts${isCreateMode ? "" : `/${contact.id}`}`}
        >
          <input name="positionId" hidden defaultValue={positionId} />

          <InputField
            name="firstName"
            label="First Name"
            type="text"
            defaultValue={contact.firstName || ""}
            required
          />

          <InputField
            name="lastName"
            label="Last Name"
            type="text"
            defaultValue={contact.lastName || ""}
            required
          />

          <InputField
            name="linkedin"
            label="LinkedIn"
            type="url"
            defaultValue={contact.linkedin || ""}
            required
          />

          <footer role="group" style={{ width: "auto" }}>
            <button type="submit">
              {isCreateMode ? "Create Contact" : "Save Changes"}
            </button>

            <a
              href={isCreateMode ? "/contacts" : `/contacts/${contact.id}`}
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

module.exports = EditContact;
