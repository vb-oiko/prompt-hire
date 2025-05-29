const React = require("react");
const Layout = require("./components/Layout.jsx");
const ActionButton = require("./components/ActionButton.jsx");
const DisplayUrlField = require("./components/DisplayUrlField.jsx");
const DisplayField = require("./components/DisplayField.jsx");
const MoreActionsDropdown = require("./components/MoreActionsDropdown.jsx");
const MessageForm = require("./components/MessageForm.jsx");
const LinkButton = require("./components/LinkButton.jsx");

/**
 * @typedef {{
 *   contact: import("../tables/ContactTable.ts").Contact;
 *   position: import("../tables/PositionTable.ts").Position;
 *   messages: import("../tables/MessageTable.ts").Message[];
 * }} ViewContactProps
 */

/**
 * Contact detail view component
 * @param {ViewContactProps} props
 * @returns {JSX.Element}
 */
const ViewContact = ({ contact, messages }) => {
  const actions = [
    {
      label: "Connection Request ✨",
      action: `/contacts/${contact.id}/generate-linkedin-connection-request-message`,
    },
  ];
  return (
    <Layout title={`${contact.firstName} ${contact.lastName} - PromptHire`}>
      <article>
        <header style={{ display: "flex", gap: "1rem" }}>
          <p style={{ marginRight: "auto" }}>
            <strong>
              {contact.firstName} {contact.lastName}
            </strong>{" "}
            contact for{" "}
            <a href={`/positions/${contact.positionId}`}>
              <strong>{contact.positionTitle}</strong> at{" "}
              <strong>{contact.positionCompany}</strong>
            </a>
          </p>
          <LinkButton
            href={`/contacts?positionId=${contact.positionId}`}
            label="Back to contacts"
          />

          <ActionButton
            action={`/contacts/${contact.id}/edit`}
            method="GET"
            label="Edit"
            className="secondary"
            disabled={true}
          />
          <MoreActionsDropdown actions={actions} />
        </header>

        <DisplayField label="First Name" value={contact.firstName} />
        <DisplayField label="Last Name" value={contact.lastName} />
        <DisplayUrlField label="LinkedIn" value={contact.linkedin} />
        <br />

        {messages.map((message) => (
          <MessageForm message={message} />
        ))}
      </article>
    </Layout>
  );
};

module.exports = ViewContact;
