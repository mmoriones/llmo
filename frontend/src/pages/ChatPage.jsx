import { useEffect, useState, useRef } from "react";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const CHAT_API = "http://localhost:8000/api/ai/chat";
const ABORT_API = "http://localhost:8000/api/ai/abort";

function ChatPage() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const controllerRef = useRef(null);
  const readerRef = useRef(null);

  const bottomRef = useRef(null);
  const chatRef = useRef(null);

  const [autoScroll, setAutoScroll] = useState(true);

  {/*Handle Autoscroll*/}
  useEffect(() => {
    const el = chatRef.current;

    const handleScroll = () => {
      const threshold = 1;
      const atBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

      setAutoScroll(atBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    if (autoScroll){
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

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
      <div className="flex h-screen bg-white dark:bg-gray-950 text-black dark:text-white">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Chat Area */}
        <main className="flex flex-col flex-1">

          <Header />

          {/* Scrollable Chat */}
          <div ref={chatRef} className="flex-1 overflow-y-auto chat-scroll">
            <div className="px-6 pb-6">
              <ChatMessages messages={messages} />
            <div ref={bottomRef}/>
          </div>
          </div>

          {/* Sticky Input */}
          <div className="bg-white dark:bg-gray-900 px-4 pb-4">
            <div className="max-w-3xl mx-auto">
              <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                stopStream={stopStream}
                isStreaming={isStreaming}
              />
            </div>
          </div>

        </main>

      </div>
    );

}

export default ChatPage;
