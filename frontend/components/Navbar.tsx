"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingCart, User, Menu, MessageCircle } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/category/electronics", label: "Electronics" },
  { href: "/category/home", label: "Home" },
  { href: "/category/fashion", label: "Fashion" },
  { href: "/chat", label: "Live Chat" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Amazon Clone <span className="text-blue-600">AI</span>
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <form className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="search"
              placeholder="Search products, categories..."
              className="w-60 border-none bg-transparent text-sm outline-none"
            />
          </form>
          <Link href="/chat" className="relative text-slate-600 hover:text-slate-900">
            <MessageCircle className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="relative text-slate-600 hover:text-slate-900">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
              2
            </span>
          </Link>
          <Link href="/account" className="text-slate-600 hover:text-slate-900">
            <User className="h-5 w-5" />
          </Link>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 p-2 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {isOpen ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
