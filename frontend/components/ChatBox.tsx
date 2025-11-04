"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface ChatBoxProps {
  userId: string;
}

interface MessageItem {
  id: string;
  text: string;
  sender: "user" | "system";
}

export function ChatBox({ userId }: ChatBoxProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000"}/ws/chat/${userId}`;
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: event.data, sender: "system" }]);
    };
    ws.onopen = () => {
      setSocket(ws);
    };
    return () => {
      ws.close();
    };
  }, [userId]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.trim()) return;
    socket?.send(draft);
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: draft, sender: "user" }]);
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold">Live Chat Support</h2>
        <p className="text-sm text-slate-500">Chat with our AI assistant for personalized recommendations</p>
      </div>
      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
        {messages.map((message) => (
          <div key={message.id} className={clsx("flex", message.sender === "user" ? "justify-end" : "justify-start")}>            <div
              className={clsx(
                "max-w-[70%] rounded-2xl px-4 py-3 text-sm",
                message.sender === "user"
                  ? "rounded-br-sm bg-blue-600 text-white"
                  : "rounded-bl-sm bg-slate-100 text-slate-800"
              )}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-slate-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
            placeholder="Ask for recommendations, order help, and more..."
          />
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
