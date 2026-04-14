import { useState, useRef } from "react";
import ChatContainer from "../components/ChatContainer";
import ChatInput from "../components/ChatInput";

const CHAT_API = "http://localhost:8000/api/ai/chat";
const ABORT_API = "http://localhost:8000/api/ai/abort";

function ChatPage() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const controllerRef = useRef(null);
  const readerRef = useRef(null);

  const stopStream = async () => {

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    await fetch(ABORT_API, {
      method: "POST"
    });

    setIsStreaming(false);

  };

  const sendMessage = async () => {

    if (!input.trim()) return;

    const controller = new AbortController();
    controllerRef.current = controller;

    setIsStreaming(true);

    const userMessage = { role: "user", content: input };

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");

    const res = await fetch(CHAT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
      signal: controller.signal
    });

    const reader = res.body.getReader();
    readerRef.current = reader;

    const decoder = new TextDecoder();

    let aiMessage = { role: "assistant", content: "" };

    setMessages([...newMessages, aiMessage]);

    while (true) {

      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      aiMessage.content += chunk;

      setMessages([...newMessages, { ...aiMessage }]);

    }

    setIsStreaming(false);

  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-4">
        LLMo Chat
      </h2>

      <ChatContainer messages={messages} />

      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        stopStream={stopStream}
        isStreaming={isStreaming}
      />

    </div>
  );
}

export default ChatPage;
