"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SimpleCard } from "./ui/SimpleCard";
import { SimpleButton } from "./ui/SimpleButton";
import { trackEvent } from "@/lib/analytics";

export default function ShopPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
        <SimpleCard className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-48 h-36 rounded-lg overflow-hidden bg-semantic-surface-muted">
            <Image src="/images/cake-placeholder.svg" alt="Cake preview" width={320} height={240} className="object-cover w-full h-full" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-semantic-text-primary">Explore our custom cakes</h3>
            <p className="mt-2 text-sm text-semantic-text-muted">Handcrafted, pastel-ready cakes for birthdays, weddings and celebrations. Starting from GHS 120.</p>

            <div className="mt-4">
              <Link href="/shop" onClick={() => trackEvent('preview_view_menu_click', { source: 'homepage' })}>
                <SimpleButton>View full menu</SimpleButton>
              </Link>
            </div>
          </div>
        </SimpleCard>
      </motion.div>
    </section>
  );
}
