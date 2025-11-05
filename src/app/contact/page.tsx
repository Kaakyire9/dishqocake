"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const phone = "233553437570"; // DishQo WhatsApp number
    const text = encodeURIComponent(
      `Hello DishQo 🎂\n\nMy name is ${name}.\nEmail: ${email}\n\n${message}\n\nSent from DishQo Contact Page 💖`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const banks = [
    { bank: "Fidelity", branch: "Ahodwo", accNo: "2030300795419", name: "Nicole Haynes" },
    { bank: "Absa", branch: "Adum, Harper Road", accNo: "0273606025", name: "Nicole Haynes" },
  ];

  const momo = [
    { provider: "MTN MoMo", number: "0546744925", name: "DishQo Limited" },
    { provider: "Vodafone Money", number: "0553437570", name: "Nicole Haynes" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: <span aria-hidden className="inline-block w-5">📸</span>, url: "https://instagram.com/dish_qo" },
    { name: "TikTok", icon: <span aria-hidden className="inline-block w-5">🎵</span>, url: "https://tiktok.com/@dish_qo" },
    { name: "Facebook", icon: <span aria-hidden className="inline-block w-5">📘</span>, url: "https://facebook.com/dish_qo" },
    { name: "Snapchat", icon: <span aria-hidden className="inline-block w-5">👻</span>, url: "https://snapchat.com/add/dish_qo" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-extrabold bg-[linear-gradient(90deg,#F89C27,#D46F2E,#F89C27)] bg-clip-text text-transparent mb-8"
      >
        Get in Touch 💌
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Bank & MoMo Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
        >
          <h2 className="text-xl font-semibold text-semantic-text-primary mb-4">Bank Details 🏦</h2>
          <div className="space-y-4">
            {banks.map((b, i) => (
              <div key={i} className="border-l-4 border-semantic-text-primary pl-4">
                <p className="font-semibold">{b.bank} Bank</p>
                <p>Branch: {b.branch}</p>
                <p>Acc No: {b.accNo}</p>
                <p>Name: {b.name}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-semantic-text-primary mt-8 mb-4">Mobile Money 💳</h2>
          <div className="space-y-3">
            {momo.map((m, i) => (
              <div key={i} className="border-l-4 border-semantic-text-primary pl-4">
                <p className="font-semibold">{m.provider}</p>
                <p>{m.number}</p>
                <p>{m.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact + Social */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
        >
          <h2 className="text-xl font-semibold text-semantic-text-primary mb-4">Contact Us 📞</h2>
          <div className="space-y-3 text-semantic-text-muted">
            <p className="flex items-center gap-2"><span aria-hidden className="inline-block w-4">📞</span> WhatsApp/Call: <Link href="tel:+233553437570" className="text-[#F89C27] hover:underline">+233 55 343 7570</Link></p>
            <p className="flex items-center gap-2"><span aria-hidden className="inline-block w-4">📧</span> <Link href="mailto:dishqolimited@gmail.com" className="text-[#F89C27] hover:underline">dishqolimited@gmail.com</Link></p>
            <p className="flex items-center gap-2"><span aria-hidden className="inline-block w-4">🌐</span> <Link href="https://www.dishqocake.com" target="_blank" className="text-[#F89C27] hover:underline">www.dishqocake.com</Link></p>
          </div>

          <h2 className="text-xl font-semibold text-semantic-text-primary mt-8 mb-4">Follow Us 🌸</h2>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-[#5c3c1f] hover:text-[#b34b6b] transition"
              >
                {s.icon} {s.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* WhatsApp Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-16 max-w-3xl mx-auto rounded-2xl backdrop-blur-lg bg-semantic-surface-ghost border border-white/20 shadow-[0_0_35px_rgba(255,255,255,0.1)] p-10 text-center"
      >
        <h2 className="text-2xl font-bold text-semantic-text-primary mb-6">Send Us a Message 💬</h2>
        <form onSubmit={handleWhatsAppSend} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/90 text-black placeholder:text-black/60 focus:ring-2 focus:ring-[#F89C27] outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/90 text-black placeholder:text-black/60 focus:ring-2 focus:ring-[#F89C27] outline-none"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message..."
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full p-3 rounded-lg bg-white/90 text-black placeholder:text-black/60 focus:ring-2 focus:ring-[#F89C27] outline-none"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="order-shine flex items-center justify-center gap-2 w-full sm:w-auto mx-auto bg-[#F89C27] text-black px-8 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-[#D46F2E] transition"
          >
            <span aria-hidden className="inline-block w-4">📨</span> Send via WhatsApp
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
