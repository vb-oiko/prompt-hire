const React = require("react");
const Layout = require("./components/Layout.jsx");
const { formatDate } = require("./utils/utils.ts");
const Page = require("./components/Page.jsx");

/**
 * @typedef {{
 *   contacts: import("../tables/ContactTable.ts").Contact[];
 *   position?: import("../tables/PositionTable.ts").Position;
 *   search?: string;
 * }} ListContactsProps
 */

/**
 * Positions view component
 * @param {ListPositionsProps} props
 */
const ListContacts = ({ contacts = [], position }) => {
  const positionId = position?.id;
  const title = position
    ? `${position.title} at ${position.company} - Contacts`
    : "Contacts";

  return (
    <Layout title={title}>
      <Page
        title={<a href={`/positions/${positionId}`}>{title}</a>}
        headerContent={
          positionId && (
            <a href={`/contacts/new?positionId=${positionId}`} role="button">
              Add Contact
            </a>
          )
        }
      >
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={3}>List of contacts will be shown here.</td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="no-wrap">{formatDate(contact.createdAt)}</td>
                  <td>
                    <a href={`/contacts/${contact.id}`}>
                      {contact.firstName} {contact.lastName}
                    </a>
                  </td>
                  <td>
                    <a href={contact.linkedin} target="_blank">
                      {contact.linkedin}
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Page>
    </Layout>
  );
};

module.exports = ListContacts;
