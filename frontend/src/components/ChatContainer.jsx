import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatContainer({ messages }) {

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <div
      ref={chatRef}
      className="border rounded-lg p-4 h-[400px] overflow-y-auto bg-gray-50"
    >
      {messages.map((m, i) => (
        <ChatMessage key={i} message={m} />
      ))}
    </div>
  );
}

export default ChatContainer;
