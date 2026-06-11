"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import "./chatWidget.css";
import LeadForm from "./LeadForm";

export default function ChatWidget() {
  // Generic welcome message (NO DB CALL= trafic cost reduction)
  const welcomeMessage = {
    role: "assistant",
    content: ` Hasse AI - Legal Assistant
    
    Welcome 👋

I am your legal assistant.

You can ask me things like:
🧠 Understanding your legal situation  
💰 Getting an estimated cost range  
⚖️ Checking if you may have legal grounds  
📩 Connecting you to a lawyer for follow-up  
📞 Leaving your details for contact 

I can help you understand your situation, but I am not a lawyer.

If your case needs deeper review, I can connect you to a human lawyer who can follow up with you. Only if you tell me to do so.

How can I help you today?
`,
  };

  const [messages, setMessages] = useState<any[]>(() => {
    return [welcomeMessage];
  });
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const searchParams = useSearchParams();
  const widgetKey = searchParams.get("key");

  const chatRef = useRef<HTMLDivElement>(null);


  // Trigger lead form on users command/insinuation
  const triggerLeadForm = (text: string) => {
    const keywords = [
      "lawyer",
      "contact",
      "call me",
      "book",
      "help me",
      "legal help",
      "sue",
      "case",
      "price",
      "cost",
      "quote",
    ];

    return keywords.some((k) =>
      text.toLowerCase().includes(k)
    );
  };
  // Send message / input to ai
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversationId,
          widgetKey,
        }),
      });

      const data = await res.json();
      // console.log("AI RESPONSE:", data.response);
      // console.log("TRIGGER CHECK:", triggerLeadForm(data.response));

      if (!data.conversationId) {
        console.error("No conversationId yet");
        return;
      }
      setConversationId(data.conversationId);
      // 1. Assistant message FIRST
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);

      // 2. THEN trigger lead form logic
      if (triggerLeadForm(data.response)) {
        setTimeout(() => {
          setShowLeadForm(true);
        }, 500);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  const submitLead = async (data: any) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        // This is commented-out so it can only be used to simulate lead /api/lead breakage or db unavaibility
        // method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
        lead: data,
        widgetKey,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error("Lead submission failed");
      }

      setShowLeadForm(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Thank you. A legal expert will contact you shortly.",
        },
      ]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, we couldn't submit your request. Please try again or contact us directly.",
        },
      ]);
    }
  };
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-container">
      {/* HEADER */}
      <div className="chat-header">
        Legal AI Assistant
      </div>

      {/* MESSAGES */}
      <div ref={chatRef} className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message ${m.role === "user" ? "message-user" : "message-bot"
              }`}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="message message-bot">
            Thinking...
          </div>
        )}
      </div>
      {showLeadForm && (
        <LeadForm
          onCancel={() => setShowLeadForm(false)}
          onSubmit={submitLead}
        />
      )}

      {/* INPUT */}
      <div className="chat-input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Ask your legal question..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage} className="chat-button">
          Send
        </button>
      </div>
    </div>
  );
}







// "use client";

// import { useState, useEffect, useRef } from "react";

// export default function ChatWidget() {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [input, setInput] = useState("");
//   const [conversationId, setConversationId] = useState("");

//   const chatRef = useRef<HTMLDivElement>(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", content: input };

//     setMessages((prev) => [...prev, userMsg]);

//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         message: input,
//         conversationId,
//       }),
//     });

//     const data = await res.json();

//     setConversationId(data.conversationId);

//     setMessages((prev) => [
//       ...prev,
//       { role: "assistant", content: data.response },
//     ]);

//     setInput("");
//   };

//   useEffect(() => {
//     chatRef.current?.scrollTo({
//       top: chatRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages]);

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         background: "#f9fafb",
//       }}
//     >
//       {/* HEADER */}
//       <div
//         style={{
//           background: "#111827",
//           color: "white",
//           padding: 12,
//           fontWeight: "bold",
//         }}
//       >
//         Legal AI Assistant
//       </div>

//       {/* MESSAGES */}
//       <div
//         ref={chatRef}
//         style={{
//           flex: 1,
//           padding: 10,
//           overflowY: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: 8,
//         }}
//       >
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             style={{
//               alignSelf: m.role === "user" ? "flex-end" : "flex-start",
//               background: m.role === "user" ? "#2563eb" : "#e5e7eb",
//               color: m.role === "user" ? "white" : "black",
//               padding: "8px 12px",
//               borderRadius: 10,
//               maxWidth: "75%",
//             }}
//           >
//             {m.content}
//           </div>
//         ))}
//       </div>

//       {/* INPUT */}
//       <div
//         style={{
//           display: "flex",
//           padding: 10,
//           gap: 8,
//           borderTop: "1px solid #eee",
//         }}
//       >
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           style={{
//             flex: 1,
//             padding: 8,
//             borderRadius: 8,
//             border: "1px solid #ddd",
//           }}
//         />

//         <button
//           onClick={sendMessage}
//           style={{
//             background: "#2563eb",
//             color: "white",
//             border: "none",
//             padding: "8px 12px",
//             borderRadius: 8,
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }




  // const submitLead = async (data: any) => {
  //   await fetch("/api/lead", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       conversationId,
  //       lead: data,
  //       widgetKey,
  //     }),
  //   });

  //   setShowLeadForm(false);

  //   setMessages((prev) => [
  //     ...prev,
  //     {
  //       role: "assistant",
  //       content:
  //         "Thank you. A legal expert will contact you shortly.",
  //     },
  //   ]);
  // };