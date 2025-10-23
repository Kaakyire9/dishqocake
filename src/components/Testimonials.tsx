"use client";

import { motion } from "framer-motion";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.012 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
    </svg>
  );
}

export default function Testimonials() {
  const items = [
    { name: 'Ama', quote: 'Best birthday cake ever — moist, pretty and delicious!', rating: 5 },
    { name: 'Kojo', quote: 'Amazing flavor combos and great service. Highly recommend!', rating: 5 },
    { name: 'Esi', quote: 'Arrived on time and tasted even better than it looked.', rating: 5 },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
  <h2 className="text-2xl font-bold text-semantic-text-primary mb-6">What our customers say</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="p-6 rounded-2xl backdrop-blur-lg bg-semantic-surface-ghost border border-white/20 shadow-[inset_0_0_18px_rgba(255,255,255,0.12)] hover:scale-[1.02] transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full bg-semantic-surface-ghost w-10 h-10 flex items-center justify-center">{it.name[0]}</div>
              <div>
                <div className="font-semibold text-semantic-text-primary">{it.name}</div>
                <div className="flex items-center gap-1 text-yellow-400 mt-1">
                  {Array.from({ length: it.rating }).map((_, idx) => (<Star key={idx} />))}
                </div>
              </div>
            </div>
            <p className="text-semantic-text-muted">"{it.quote}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
