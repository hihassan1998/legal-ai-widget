"use client";

import { useEffect } from "react";

export default function WidgetLoader() {
  useEffect(() => {
    const existing = document.getElementById("legal-ai-widget");

    if (existing) return;

    const script = document.createElement("script");

    script.id = "legal-ai-widget";
    script.src = "/widget.js";
    script.setAttribute("data-key", "demo-lawfirm");

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}