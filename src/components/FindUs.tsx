"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ExternalLink } from "lucide-react";

type Props = {
  address?: string;
  hours?: string[];
  query?: string; // for maps
};

export default function FindUs({
  address = "Kumasi, Ghana",
  hours = [
    "Mon - Fri: 8:00am – 7:00pm",
    "Sat: 9:00am – 6:00pm",
    "Sun: Closed",
  ],
  query = "DishQo Cake Kumasi",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const mapQuery = encodeURIComponent(query || address);
  const embedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <section
      aria-labelledby="find-us"
      className="w-full relative overflow-hidden py-10 bg-black/80 border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-black p-6 shadow-xl border border-white/5">
          {/* Title Section */}
          <div className="mb-6">
            <h3
              id="find-us"
              className="text-2xl md:text-3xl font-extrabold text-dishqo-heading inline-block"
            >
              Find Us
            </h3>
            <div className="mt-2">
              <span
                aria-hidden
                className={`block h-0.5 bg-gradient-to-r from-[#f5b500] to-[#F89C27] transform origin-left transition-transform duration-500 ${
                  mounted ? "scale-x-100" : "scale-x-0"
                } w-16 rounded-full`}
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5 text-[#F89C27]" />
                <p className="text-sm">{address}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#f5b500]" /> Opening Hours
                </h4>
                <ul className="text-sm text-white/70 space-y-1">
                  {hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-[#f5b500] to-[#F89C27] text-black font-semibold shadow hover:scale-[1.03] transition-transform"
                >
                  <ExternalLink className="w-4 h-4" />
                  Get Directions
                </a>

                <button
                  onClick={() => setShowMap(!showMap)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f5b500]/40 text-[#f5b500] hover:bg-[#f5b500]/10 transition-all text-sm font-semibold"
                >
                  {showMap ? "Hide Map" : "View Map"}
                </button>
              </div>
            </div>

            {/* Click-to-Expand Map */}
            <AnimatePresence>
              {showMap && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden rounded-xl border border-white/10 shadow-inner"
                >
                  <iframe
                    title="DishQo location map"
                    src={embedSrc}
                    width="100%"
                    height="250"
                    className="w-full border-0 rounded-xl"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
