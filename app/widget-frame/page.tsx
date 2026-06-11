"use client";
import { Suspense } from "react";
import ChatWidget from "../components/ChatWidget";

export default function WidgetFrame() {
  return (
    <Suspense fallback={<div>Loading widget...</div>}>
      <ChatWidget />
    </Suspense>
  );
}