const React = require("react");
const Layout = require("./components/Layout.jsx");
const { formatDate, formatLinkedin } = require("./utils/utils.ts");
const Page = require("./components/Page.jsx");
const LinkButton = require("./components/LinkButton.jsx");

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
const ListContacts = ({ contacts = [], position, search }) => {
  const positionId = position?.id;

  const title = position ? (
    <p>
      <span>Contacts for </span>
      <a href={`/positions/${positionId}`}>
        {position.title} at {position.company}
      </a>
    </p>
  ) : (
    "Contacts"
  );

  return (
    <Layout title={title}>
      <Page
        title={title}
        headerContent={
          <form action={`/contacts`} method="GET" className="flex">
            <input name="positionId" hidden value={positionId} />
            <input
              name="search"
              type="text"
              placeholder="Search"
              className="w-20"
              defaultValue={search}
            />
            <button type="submit" className="w-fit h-min-content">
              Search
            </button>
            {positionId && (
              <LinkButton
                href={`/contacts/new?positionId=${positionId}`}
                label="Add Contact"
              />
            )}
          </form>
        }
      >
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Company</th>
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
                  <td>{contact.positionCompany}</td>
                  <td>
                    <a href={contact.linkedin} target="_blank">
                      <span className="overflow-ellipsis w-40">
                        {formatLinkedin(contact.linkedin)}
                      </span>
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
