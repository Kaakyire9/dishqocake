"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.012 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
    </svg>
  );
}

export default function Testimonials() {
  const items = [
    {
      name: "Ama",
      quote:
        "The best birthday cake ever — moist, pretty, and delicious! Everyone asked where it came from.",
      rating: 5,
      image: "/images/reviewer-1.png",
    },
    {
      name: "Kojo",
      quote:
        "Incredible flavor combinations and such a smooth ordering experience. Highly recommend DishQo!",
      rating: 5,
      image: "/images/reviewer-2.png",
    },
    {
      name: "Esi",
      quote:
        "Arrived right on time, looked perfect, and somehow tasted even better. 10/10!",
      rating: 5,
      image: "/images/reviewer-3.jpg",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
      {/* Soft decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 opacity-70 -z-10" />

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-semantic-text-primary"
      >
        What Our Customers Say
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="group relative p-8 rounded-2xl backdrop-blur-2xl bg-white/70 border border-rose-100 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
          >
            {/* Reviewer Avatar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-rose-100">
                <Image
                  src={it.image}
                  alt={it.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-semantic-text-primary">
                  {it.name}
                </h3>
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: it.rating }).map((_, idx) => (
                    <Star key={idx} />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-semantic-text-muted italic leading-relaxed">
              “{it.quote}”
            </p>

            {/* Floating accent hearts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.25, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="absolute -top-4 -right-4 text-rose-200 text-3xl"
            >
              ❤️
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
