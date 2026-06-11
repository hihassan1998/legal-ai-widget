"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatWidget() {
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
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f9fafb",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#111827",
          color: "white",
          padding: 12,
          fontWeight: "bold",
        }}
      >
        Legal AI Assistant
      </div>

      {/* MESSAGES */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          padding: 10,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#2563eb" : "#e5e7eb",
              color: m.role === "user" ? "white" : "black",
              padding: "8px 12px",
              borderRadius: 10,
              maxWidth: "75%",
            }}
          >
            {m.content}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div
        style={{
          display: "flex",
          padding: 10,
          gap: 8,
          borderTop: "1px solid #eee",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
