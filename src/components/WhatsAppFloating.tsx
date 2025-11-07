"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

type Props = {
  whatsapp?: string;
  phone?: string;
};

export default function FloatingContactButtons({
  whatsapp = "233553437570",
  phone = "233553437570",
}: Props) {
  const waHref = `https://wa.me/${whatsapp}`;
  const callHref = `tel:${phone}`;
  const controls = useAnimation();

  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });

  // 🧭 Cursor tracking for reactive float
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      setCursorOffset({ x: x * 10, y: y * 10 }); // subtle parallax
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // 📞 Call button shows on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 250) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        });
      } else {
        controls.start({
          opacity: 0,
          y: 40,
          transition: { duration: 0.6, ease: "easeIn" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <motion.div
      className="fixed z-50 bottom-6 right-6 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8 pointer-events-none"
      style={{
        transform: `translate(${cursorOffset.x}px, ${cursorOffset.y}px)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* 📞 Call Button (mobile only) */}
      <motion.a
        href={callHref}
        aria-label="Call DishQo"
        className="sm:hidden group flex items-center gap-3 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#F89C27]/30 pointer-events-auto"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
      >
        <motion.span
          className="relative flex items-center justify-center w-14 h-14 rounded-full"
          initial={{ boxShadow: "0px 6px 18px rgba(245,181,0,0.18)" }}
          whileHover={{
            boxShadow: "0px 10px 30px rgba(245,181,0,0.35)",
            scale: 1.04,
          }}
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -4, 0],
            boxShadow: [
              "0px 6px 18px rgba(245,181,0,0.18)",
              "0px 8px 24px rgba(245,181,0,0.32)",
              "0px 6px 18px rgba(245,181,0,0.18)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f5b500] to-[#F89C27]" />
          <FaPhoneAlt size={20} className="text-white relative z-10" />
        </motion.span>
      </motion.a>

      {/* 💬 WhatsApp Floating Button */}
      <motion.a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with DishQo on WhatsApp"
        className="group flex items-center gap-3 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-[#F89C27]/30 pointer-events-auto"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Label */}
        <span className="hidden md:inline-flex select-none mr-2 px-3 py-2 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#f5b500] to-[#F89C27] shadow-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          Chat with us
        </span>

        {/* WhatsApp core */}
        <motion.span
          className="relative flex items-center justify-center w-14 h-14 rounded-full"
          initial={{ boxShadow: "0px 6px 18px rgba(245,181,0,0.18)" }}
          whileHover={{
            boxShadow: "0px 10px 30px rgba(245,181,0,0.38)",
            scale: 1.06,
          }}
          animate={{
            scale: [1, 1.06, 1],
            y: [0, -4, 0],
            boxShadow: [
              "0px 6px 18px rgba(245,181,0,0.18)",
              "0px 10px 30px rgba(245,181,0,0.36)",
              "0px 6px 18px rgba(245,181,0,0.18)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f5b500] to-[#F89C27]" />
          <FaWhatsapp size={24} className="text-white relative z-10" />
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
