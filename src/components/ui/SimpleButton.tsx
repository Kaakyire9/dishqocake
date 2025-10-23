"use client";

import React from "react";

export function SimpleButton({ children, className = "", onClick, href }: { children: React.ReactNode; className?: string; onClick?: () => void; href?: string }) {
  if (href) {
    return (
  <a href={href} className={`inline-flex items-center px-4 py-2 rounded-md bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white ${className}`}>
        {children}
      </a>
    );
  }

  return (
  <button onClick={onClick} className={`inline-flex items-center px-4 py-2 rounded-md bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white ${className}`}>
      {children}
    </button>
  );
}
