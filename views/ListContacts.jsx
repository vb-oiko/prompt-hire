const React = require("react");
const Layout = require("./components/Layout.jsx");
const { formatDate } = require("./utils/utils.ts");

/**
 * @typedef {{
 *   positions: import("../tables/PositionTable.ts").Position[];
 *   positionId?: number;
 *   search?: string;
 * }} ListContactsProps
 */

/**
 * Positions view component
 * @param {ListPositionsProps} props
 */
const ListContacts = ({ contacts = [], positionId, search }) => {
  return (
    <Layout title="Contacts List">
      <article>
        <header style={{ display: "flex", justifyContent: "end" }}>
          {positionId && (
            <a href={`/contacts/new?positionId=${positionId}`} role="button">
              Add Contact
            </a>
          )}
        </header>
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
      </article>
    </Layout>
  );
};

module.exports = ListContacts;
