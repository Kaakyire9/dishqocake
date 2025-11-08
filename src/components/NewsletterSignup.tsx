"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thanks — you're on the list!");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data?.error || "Subscription failed. Try again later.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto px-4"
      aria-labelledby="newsletter-heading"
    >
      <div className="rounded-2xl bg-black/85 border border-white/6 p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 id="newsletter-heading" className="text-xl font-extrabold text-dishqo-heading">
              Join the DishQo Family
            </h3>
            <p className="mt-1 text-sm text-white/80">Be first to taste our golden offers.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full sm:w-auto flex items-center gap-3">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              aria-label="Email address"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-72 px-4 py-2 rounded-full bg-white text-black placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#F89C27]"
              required
            />

            <motion.button
              type="submit"
              aria-label="Subscribe to newsletter"
              whileTap={{ scale: 0.98 }}
              // Use a tween for multi-keyframe bounce to avoid spring's 2-keyframe limitation
              animate={
                status === "success"
                  ? { scale: [1, 1.04, 1] }
                  : { scale: 1 }
              }
              transition={
                status === "success"
                  ? { duration: 0.55, ease: "easeOut" }
                  : { type: "spring", stiffness: 300, damping: 12 }
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-[#f5b500] to-[#F89C27] text-black font-semibold shadow-sm hover:translate-y-[-1px] transition-transform"
            >
              {status === "loading" ? "Saving..." : "Subscribe"}
            </motion.button>
          </form>
        </div>

        {message && (
          <p
            role={status === "error" ? "alert" : "status"}
            className={`mt-3 text-sm ${status === "error" ? "text-red-400" : "text-green-300"}`}
          >
            {message}
          </p>
        )}
      </div>
    </motion.section>
  );
}
