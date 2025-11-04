"use client";

import { ChatBox } from "@/components/ChatBox";

export default function ChatPage() {
  const userId = "demo-user-123";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="text-slate-500">Get instant help with product recommendations and order queries</p>
      </div>
      <div className="h-[600px]">
        <ChatBox userId={userId} />
      </div>
    </div>
  );
}
