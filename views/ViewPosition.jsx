const React = require("react");
const Layout = require("./components/Layout");
const InputField = require("./components/InputField");
const ActionButton = require("./components/ActionButton");
const DisplayField = require("./components/DisplayField");
const DisplayPreFormattedField = require("./components/DisplayPreFormattedField");
const DisplayUrlField = require("./components/DisplayUrlField");
/**
 * Position detail view component
 * @param {import("./types.ts").PositionView} props
 * @returns {JSX.Element}
 */
const ViewPosition = ({ position = {} }) => {
  return (
    <Layout title={`${position.title} - PromptHire`}>
      <article>
        <header className="grid">
          <ActionButton
            action={`/positions/${position.id}/parse`}
            label="Parse Description"
          />
          <ActionButton
            action={`/positions/${position.id}/optimize`}
            label="Resume ✨"
          />
          <ActionButton
            action={`/positions/${position.id}/create-cover-letter`}
            label="Cover Letter ✨"
          />
          <ActionButton
            action={`/positions/${position.id}/create-documents`}
            label="PDFs ✨"
            disabled={Boolean(position.optimizedResumeJson)}
          />
          <ActionButton
            action={`/positions/${position.id}/edit`}
            method="GET"
            label="Edit"
            className="secondary"
          />
        </header>

        <DisplayField label="Title" value={position.title} />
        <DisplayField label="Company" value={position.company} />
        <DisplayField label="Location" value={position.location} />
        <DisplayUrlField label="Position Page" value={position.url} />
        <DisplayPreFormattedField
          label="Description"
          value={position.description}
        />
        <DisplayField label="Salary" value={position.salary} />
        <DisplayField label="Skills" value={position.skills} />
        <DisplayField label="Tags" value={position.tags} />
        <DisplayField label="Status" value={position.status} />
        <DisplayPreFormattedField
          label="Optimized Resume Text"
          value={position.optimizedResumeText}
        />
        <DisplayPreFormattedField
          label="Optimized Resume JSON"
          value={position.optimizedResumeJson}
        />
        <DisplayPreFormattedField
          label="Cover Letter Text"
          value={position.coverLetterText}
        />
        <DisplayPreFormattedField
          label="Cover Letter JSON"
          value={position.coverLetterJson}
        />
        <DisplayUrlField label="Resume URL" value={position.resumeUrl} />
        <DisplayUrlField
          label="Cover Letter URL"
          value={position.coverLetterUrl}
        />
        <DisplayField
          label="Additional Joining Reasons"
          value={position.additionalJoiningReasons}
        />
        <DisplayField label="Created At" value={position.createdAt} />
        <DisplayField label="Updated At" value={position.updatedAt} />
      </article>
    </Layout>
  );
};

module.exports = ViewPosition;
