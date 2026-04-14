import MarkdownMessage from "./MarkdownMessage";

function ChatMessages({ messages }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {messages.map((message, i) => (
        <div
          key={i}
          className={`flex ${
            message.role === "user" ? "justify-end" : "w-full" 
          }`}
        >
          <div
            className={`px-4 py-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-600 text-white dark:bg-blue-600"
                : "text-black dark:text-white w-full"
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
