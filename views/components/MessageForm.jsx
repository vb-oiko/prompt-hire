const React = require("react");

/**
 * @typedef {{
 *   message: import("../../tables/MessageTable.ts").Message;
 * }} MessageFormProps
 */

/**
 * Message form component
 * @param {MessageFormProps} props
 * @returns {JSX.Element}
 */
const MessageForm = ({ message }) => {
  return (
    <form action={`/messages/${message.id}`} method="POST">
      <article>
        <textarea name="text" defaultValue={message.text} />
        <footer>
          <button type="submit" className="w-auto secondary">
            Update
          </button>
        </footer>
      </article>
    </form>
  );
};

module.exports = MessageForm;
