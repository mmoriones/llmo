import { useState, useEffect, useRef } from "react";

export default function useAutoScroll(messages) {

  const bottomRef = useRef(null);
  const chatRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Detect if user is near bottom
  useEffect(() => {

    const el = chatRef.current;
    if (!el) return;

    const handleScroll = () => {
      const threshold = 1;
      const atBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

      setAutoScroll(atBottom);
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);

  }, []);

  // Scroll when new messages arrive
  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  return {
    chatRef,
    bottomRef,
  };
}
