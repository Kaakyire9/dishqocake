"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GallerySection() {
  const items = [1, 2, 3, 4, 5, 6];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }

    if (openIndex !== null) {
      // set preferred JPG first; onError will fall back to SVG
      setModalSrc(`/gallery/gallery${openIndex + 1}.jpg`);
      window.addEventListener("keydown", onKey);
    }

    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  function onImgError() {
    if (openIndex === null) return;
    setModalSrc(`/gallery/${openIndex + 1}.svg`);
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-semantic-text-primary mb-6">Gallery</h2>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {items.map((n, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-lg overflow-hidden bg-semantic-surface-muted cursor-pointer"
            onClick={() => setOpenIndex(i)}
          >
            <picture>
              <source srcSet={`/gallery/gallery${i + 1}.jpg`} type="image/jpeg" />
              <img
                src={`/gallery/${i + 1}.svg`}
                alt={`Gallery ${i + 1}`}
                width={640}
                height={480}
                className="object-cover w-full h-40"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-30 transition" />
          </motion.div>
        ))}
      </div>

      {openIndex !== null && modalSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
          <button
            className="absolute top-6 right-6 text-white text-2xl"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
          >
            ×
          </button>

          <div className="max-w-[90vw] max-h-[90vh] overflow-hidden rounded-lg shadow-lg bg-white">
            <img
              src={modalSrc}
              onError={onImgError}
              alt={`Full gallery ${openIndex + 1}`}
              className="w-full h-auto block max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
