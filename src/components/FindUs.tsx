"use client";

import React, { useEffect, useState } from "react";

type Props = {
  address?: string;
  hours?: string[];
  query?: string; // used for maps query/directions
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

  useEffect(() => {
    // trigger underline animation after mount
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const mapQuery = encodeURIComponent(query || address);
  const embedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <section aria-labelledby="find-us" className="w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="p-5 rounded-xl bg-black/80 border border-white/6 shadow-lg text-white">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Left: map */}
            <div className="w-full md:w-2/3 rounded-lg overflow-hidden">
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200/10">
                <iframe
                  title="DishQo location"
                  src={embedSrc}
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: info */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div>
                <h3
                  id="find-us"
                  className="text-2xl font-extrabold text-dishqo-heading inline-block"
                >
                  Find Us
                </h3>

                {/* animated underline */}
                <div className="mt-2">
                  <span
                    aria-hidden
                    className={`block h-0.5 bg-gradient-to-r from-[#f5b500] to-[#F89C27] transform origin-left transition-transform duration-500 ${
                      mounted ? "scale-x-100" : "scale-x-0"
                    } w-14 rounded-full`}
                  />
                </div>
              </div>

              <address className="not-italic text-sm text-white/80">
                {address}
              </address>

              <div>
                <h4 className="text-sm font-semibold text-white">Opening hours</h4>
                <ul className="mt-1 text-sm text-white/70 space-y-1">
                  {hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-br from-[#f5b500] to-[#F89C27] text-black font-semibold shadow-sm hover:scale-[1.02] transition-transform"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
