import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000/api/ai/chat";

function App() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const controllerRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const chatRef = useRef(null);
  const readerRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const stopStream = async () => {

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    await fetch("http://localhost:8000/api/ai/abort", {
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

    setInput("");

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);

    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: newMessages
      }), 
      signal: controller.signal
    });

    const reader = res.body.getReader();
    readerRef.current = reader;
    const decoder = new TextDecoder();

    let aiMessage = { role: "assistant", content: "" };

    setMessages([...newMessages, aiMessage]);

    try {

      while (true) {

        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);

        aiMessage.content += chunk;

        setMessages([...newMessages, { ...aiMessage }]);

      }

    } catch (err) {

      if (err.name === "AbortError") {
        console.log("Stream stopped");
      }

    }
    setIsStreaming(false);

   };


  return (
    <div className="max-w-3xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-4">
        LLMo Chat
      </h2>

      <div 
        ref={chatRef}
        className="border rounded-lg p-4 h-[400px] overflow-y-auto bg-gray-50"
      >

        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <span className="font-semibold">
              {m.role}:
            </span>{" "}
            {m.content}
          </div>
        ))}

      </div>

      <div className="flex gap-2 mt-4">

        <input
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message..."
        />

        {!isStreaming ? (

          <button 
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>

        ) : (

          <button 
            onClick={stopStream}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Stop
          </button>

        )}

      </div>

    </div>
  );
}

export default App;
