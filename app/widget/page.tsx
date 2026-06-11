"use client";

import { useState, useRef, useEffect } from "react";
import "./widget.css";

export default function WidgetPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };

    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        conversationId,
      }),
    });

    const data = await res.json();

    setConversationId(data.conversationId);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.response },
    ]);

    setInput("");
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        ⚖️ Legal AI Assistant
      </div>

      <div className="chat-box" ref={chatRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${
              m.role === "user" ? "user" : "ai"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          value={input}
          placeholder="Ask a legal question..."
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}