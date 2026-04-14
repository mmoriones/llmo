import MarkdownMessage from "./MarkdownMessage";

function ChatMessage({ message }) {

  return (
    <div
      className={`mb-4 flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-lg ${
          message.role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        <MarkdownMessage content={message.content} />
      </div>
    </div>
  );
}

export default ChatMessage;
