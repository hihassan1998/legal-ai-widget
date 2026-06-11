"use client";

import { useState } from "react";
import "./leadForm.css";

export default function LeadForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const validate = () => {
    if (!lead.name.trim()) return "Name is required";
    if (!lead.phone.trim()) return "Phone number is required";
    return "";
  };

  const handleSubmit = () => {
    const err = validate();

    if (err) {
      setError(err);
      return;
    }

    onSubmit(lead);
  };

  return (
    <div className="lead-form">
      <h3>Request legal contact</h3>

      {/* ERROR MESSAGE */}
      {error && <p className="error">{error}</p>}

      <input
        placeholder="Your name *"
        value={lead.name}
        onChange={(e) => {
          setLead({ ...lead, name: e.target.value });
          setError("");
        }}
      />

      <input
        placeholder="Email (optional)"
        value={lead.email}
        onChange={(e) => {
          setLead({ ...lead, email: e.target.value });
        }}
      />

      <input
        placeholder="Phone number *"
        value={lead.phone}
        onChange={(e) => {
          setLead({ ...lead, phone: e.target.value });
          setError("");
        }}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleSubmit}>
          Send to lawyer
        </button>

        <button onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}