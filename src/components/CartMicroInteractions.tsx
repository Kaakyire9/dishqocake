"use client";

import React, { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type AddButtonProps = HTMLMotionProps<"button"> & {
  onAdd?: () => void | Promise<void>;
};

export function AddToCartButton({ onAdd, children, className = "", ...rest }: AddButtonProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    try {
      if (onAdd) {
        const res = onAdd();
        if (res && typeof (res as Promise<void>).then === "function") {
          await res;
        }
      }

      // small success pulse + confetti
      setIsSuccess(true);

      // dynamic import of canvas-confetti so we don't bloat SSR bundle
      try {
        const confettiModule = await import("canvas-confetti");
        const confetti = confettiModule.default || confettiModule;
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore if confetti lib not available
      }

      setTimeout(() => setIsSuccess(false), 1200);
    } catch {
      // noop — caller handles toast/errors
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2, boxShadow: [
        "0 6px 18px rgba(0,0,0,0.06)",
        "0 10px 28px rgba(245,181,0,0.18)",
      ] }}
      whileTap={{ scale: 0.97 }}
      animate={isSuccess ? { scale: [1, 1.06, 1] } : {}}
      transition={{
        // keep spring for most animations, but use a tween for the scale keyframes
        default: { type: "spring", stiffness: 300, damping: 18 },
        scale: isSuccess
          ? { duration: 0.45, times: [0, 0.5, 1], ease: "easeOut" }
          : { type: "spring", stiffness: 300, damping: 18 },
      }}
      onClick={handleClick}
      className={`${className} focus:outline-none ring-offset-2`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export default function CartMicroInteractions() {
  // placeholder wrapper component for potential future global hooks
  return null;
}
