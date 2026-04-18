import AppLayout from "../layouts/AppLayout";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import useChat from "../hooks/useChat";
import useAutoScroll from "../hooks/useAutoScroll";
import { useState } from "react";

function CodePage() {

  const [input, setInput] = useState("");
  
  const { messages, sendMessage, stopStream, isStreaming } = useChat({
    chatApi: "http://localhost:8000/api/ai/chat/img",
  });

  const { chatRef, bottomRef } = useAutoScroll(messages)

  return (
    <AppLayout
      sidebar={<Sidebar />}
      header={<Header />}
    >
      <div className="flex flex-col h-full">
      {/* Scrollable Chat */}
      <div ref={chatRef} className="flex-1 overflow-y-auto chat-scroll">
          <div className="px-6 pb-6">
            <ChatMessages messages={messages}/>
          <div ref={bottomRef}/>
        </div>
      </div>

      {/* Sticky Input */}
      <div className="bg-white dark:bg-transparent pb-4">
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
    </div>
    </AppLayout>
  );
}

export default CodePage;
