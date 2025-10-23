"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  const [show, setShow] = React.useState(false);
  const id = React.useId();

  return (
    <span className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, { 'aria-describedby': `tooltip-${id}` })
        : children}

      <AnimatePresence>
        {show && (
          <motion.div
            id={`tooltip-${id}`}
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute -left-2/4 bottom-full mb-3 w-max max-w-xs bg-overlay-dark text-white text-sm rounded-md px-3 py-2 shadow-lg"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
