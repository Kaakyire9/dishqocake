"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
};

export default function GallerySection() {
  const items: GalleryItem[] = [
    { type: "image", src: "/gallery/gallery7.jpg", alt: "Berry Drip Cake" },
  { type: "video", src: "/gallery/frosting.mp4", poster: "/gallery/frosting.jpg", alt: "Frosting cake" },
    { type: "image", src: "/gallery/gallery8.jpg", alt: "Wedding Cake" },
  { type: "video", src: "/gallery/chocolatepour.mp4", poster: "/gallery/gallery4.jpg", alt: "Pouring chocolate" },
    { type: "image", src: "/gallery/gallery3.jpg", alt: "Cupcake Tray" },
    { type: "image", src: "/gallery/gallery4.jpg", alt: "Celebration Cake" },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
        return;
      }
      // Only navigate between items with arrow keys when the modal is open
      if (openIndex === null) return;
      if (e.key === "ArrowRight") setOpenIndex((p) => (p === null ? 0 : (p + 1) % items.length));
      if (e.key === "ArrowLeft") setOpenIndex((p) => (p === null ? 0 : (p - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, openIndex]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (openIndex !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [openIndex]);

  // Focus trap inside modal and restore focus to trigger on close
  useEffect(() => {
    if (openIndex !== null) {
      // focus close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 0);

      const focusableSelector =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])';

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const modalEl = modalRef.current;
        if (!modalEl) return;
        const nodes = Array.from(modalEl.querySelectorAll<HTMLElement>(focusableSelector)).filter(
          (el) => !el.hasAttribute("disabled") && (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0)
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      return () => {
        document.removeEventListener("keydown", handleTab);
        // restore focus to the element that opened the modal
        lastTriggerRef.current?.focus();
      };
    }
    // when modal not open, do nothing
    return;
  }, [openIndex]);

  return (
  <section id="gallery" className="max-w-6xl mx-auto px-6 py-16 relative">
  <h2 className="text-3xl font-bold text-dishqo-heading mb-8 text-center">DishQo Gallery</h2>

      {/* Masonry-like responsive grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[200px]">
        {items.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            aria-label={`Open ${item.alt}`}
            whileHover={{ scale: 1.03 }}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            onClick={(e) => {
              lastTriggerRef.current = e.currentTarget as HTMLButtonElement;
              setOpenIndex(i);
            }}
          >
            {item.type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ) : (
              // Use a poster image for video thumbnails (falls back to replacing .mp4 -> .jpg)
              <div className="relative w-full h-full">
                <Image
                  src={item.poster ?? item.src.replace(/\.mp4$/, ".jpg")}
                  alt={`${item.alt} preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center">
                    <span className="text-white text-2xl" aria-hidden>
                      ▶
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Gradient overlay (non-interactive) */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Caption */}
            {item.caption && (
              <p className="absolute bottom-3 left-3 text-white text-sm drop-shadow-md">{item.caption}</p>
            )}
          </motion.button>
        ))}
      </div>

      {/* Modal view */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            key="modal"
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              key="content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl bg-black/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                className="absolute top-3 right-3 text-white text-3xl z-50 hover:scale-110 transition"
                aria-label="Close"
                onClick={() => setOpenIndex(null)}
              >
                ×
              </button>

              {items[openIndex].type === "image" ? (
                <Image
                  src={items[openIndex].src}
                  alt={items[openIndex].alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
                />
              ) : (
                // Load video only when modal is open to reduce initial bandwidth
                <video
                  src={items[openIndex].src}
                  autoPlay
                  controls
                  loop
                  className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
