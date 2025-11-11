"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Review = {
  author_name: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
  profile_photo_url?: string;
  source_url?: string;
};

export default function GoogleReviews({ autoAdvanceMs = 6000 }: { autoAdvanceMs?: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/google-reviews");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        if (mounted && Array.isArray(data?.reviews)) setReviews(data.reviews.slice(0, 8));
      } catch {
        // fallback to small mock set (should not normally happen since API route returns mock)
        if (mounted)
          setReviews([
            { author_name: "Esi A.", rating: 5, text: "Delicious cakes and prompt delivery — highly recommended!" },
            { author_name: "Kwame B.", rating: 5, text: "Stunning design and great taste. Our wedding cake was perfect." },
            { author_name: "Fafa M.", rating: 4, text: "Lovely cupcakes — I'll order again!" },
          ]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    // auto-advance
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (reviews.length > 1) {
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % reviews.length);
      }, autoAdvanceMs) as unknown as number;
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [reviews, autoAdvanceMs]);

  function go(delta: number) {
    if (reviews.length === 0) return;
    setIndex((i) => (i + reviews.length + delta) % reviews.length);
  }

  const star = (n: number) => (
    <span aria-hidden className="text-[#F5B500]">{Array.from({ length: 5 }).map((_, i) => (i < n ? "★" : "☆")).join("")}</span>
  );

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-black text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#F5B500]">What our customers say</h3>
          <div className="flex gap-2">
            <button aria-label="Previous review" onClick={() => go(-1)} className="text-white/80 hover:text-white">
              ‹
            </button>
            <button aria-label="Next review" onClick={() => go(1)} className="text-white/80 hover:text-white">
              ›
            </button>
          </div>
        </div>

        <div className="relative h-40">
          <AnimatePresence initial={false} mode="wait">
            {reviews.length > 0 ? (
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 overflow-hidden">
                    {reviews[index].profile_photo_url ? (
                      <Image src={reviews[index].profile_photo_url} alt={reviews[index].author_name} width={48} height={48} className="object-cover" />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center text-xl font-bold text-white bg-white/5">{reviews[index].author_name?.split(" ")[0]?.charAt(0) ?? "D"}</div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="font-semibold text-white">{reviews[index].author_name}</div>
                      <div className="text-sm">{star(Math.round(reviews[index].rating || 0))}</div>
                      {reviews[index].relative_time_description && (
                        <div className="text-sm text-white/60">· {reviews[index].relative_time_description}</div>
                      )}
                    </div>
                    <p className="mt-2 text-white/80 text-sm max-w-3xl">{reviews[index].text ?? "Lovely experience."}</p>
                    {reviews[index].source_url && (
                      <div className="mt-2">
                        <a href={reviews[index].source_url} target="_blank" rel="noreferrer" className="text-sm text-[#F5B500] hover:underline">View on Google</a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.blockquote>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center text-white/70">
                Loading reviews…
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${i === index ? "bg-[#F5B500]" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { GoogleReviews };
