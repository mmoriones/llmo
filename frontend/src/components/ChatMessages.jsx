import MarkdownMessage from "./MarkdownMessage";

function ChatMessages({ messages }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {messages.map((message, i) => (
        <div
          key={i}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-500 text-white dark:bg-blue-600"
                : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
            }`}
          >
            <MarkdownMessage content={message.content} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
