"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

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
        setMessage("You're officially in the DishQo family 🍰");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4"
      aria-labelledby="newsletter-heading"
    >
      <div className="rounded-2xl bg-black/90 border border-white/10 p-6 text-white shadow-lg backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <h3 id="newsletter-heading" className="text-2xl font-extrabold text-dishqo-heading">
              Join the DishQo Family
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Be first to taste our golden offers & exclusive drops.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-auto flex items-center gap-3"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full sm:w-72 px-4 py-2 rounded-full border focus:outline-none transition-all
              ${
                status === "error"
                  ? "border-red-400 focus:ring-red-400"
                  : "border-transparent focus:ring-2 focus:ring-[#F89C27]"
              }
              bg-white text-black placeholder:text-black/60`}
              required
            />

            {/* 🔥 Animated Gold Pulse Button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              animate={
                status === "success"
                  ? { scale: [1, 1.05, 1] }
                  : status === "idle"
                  ? {
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 0px rgba(248,156,39,0.0)",
                        "0 0 16px rgba(248,156,39,0.4)",
                        "0 0 0px rgba(248,156,39,0.0)",
                      ],
                    }
                  : { scale: 1 }
              }
              transition={
                status === "success"
                  ? { duration: 0.5, ease: "easeOut" }
                  : { repeat: Infinity, duration: 2.8, ease: "easeInOut" }
              }
              disabled={status === "loading"}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold shadow-sm transition-transform
                ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-br from-[#f5b500] to-[#F89C27] text-black hover:translate-y-[-1px]"
                }`}
            >
              {status === "loading" && "Saving..."}
              {status === "success" && (
                <>
                  <CheckCircle className="w-4 h-4 text-white" />
                  Subscribed!
                </>
              )}
              {status === "idle" || status === "error" ? "Subscribe" : ""}
            </motion.button>
          </form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: message ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {message && (
            <p
              role={status === "error" ? "alert" : "status"}
              className={`mt-3 text-sm flex items-center gap-2 ${
                status === "error" ? "text-red-400" : "text-green-400"
              }`}
            >
              {status === "error" ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {message}
            </p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
