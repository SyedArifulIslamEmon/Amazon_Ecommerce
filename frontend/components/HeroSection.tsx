import Link from "next/link";
import { Sparkles, ShoppingBag, MessageCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-20 text-white sm:px-12 lg:px-20">
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
          <Sparkles className="h-4 w-4" />
          Powered by AI
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Shop Smarter with
          <br />
          AI-Powered Recommendations
        </h1>
        <p className="mb-8 text-lg text-blue-100">
          Experience the future of online shopping with intelligent product recommendations, real-time
          chat support, and semantic search powered by GPT-4.5 and advanced ML models.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
          >
            <ShoppingBag className="h-5 w-5" />
            Browse Products
          </Link>
          <Link
            href="/chat"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5" />
            Chat with AI Assistant
          </Link>
        </div>
      </div>
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-400/30 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
    </section>
  );
}
