import { useState, useRef } from "react";

export default function useChat({ chatApi }) {

    const ABORT_API = "http://localhost:8000/api/ai/abort";
    const [messages, setMessages] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);

    const controllerRef = useRef(null);

    const stopStream = async () => {

        if (controllerRef.current) {
        controllerRef.current.abort();
        }

        await fetch(ABORT_API, { method: "POST" });

        setIsStreaming(false);
    };

    const sendMessage = async (input) => {

        if (!input.trim()) return;

        const controller = new AbortController();
        controllerRef.current = controller;

        const userMessage = { role: "user", content: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setIsStreaming(true);

        const res = await fetch(chatApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        signal: controller.signal
        });

        const reader = res.body.getReader();
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

    return { messages, sendMessage, stopStream, isStreaming };
}
