"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GallerySection() {
  const images = [
    '/gallery/1.svg','/gallery/2.svg','/gallery/3.svg','/gallery/4.svg','/gallery/5.svg','/gallery/6.svg'
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
  <h2 className="text-2xl font-bold text-semantic-text-primary mb-6">Gallery</h2>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {images.map((src, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} className="relative rounded-lg overflow-hidden bg-semantic-surface-muted">
            <Image src={src} alt={`Gallery ${i+1}`} width={640} height={480} className="object-cover w-full h-40" />
            <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-30 transition" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
