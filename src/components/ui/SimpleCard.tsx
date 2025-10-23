"use client";

import React from "react";

export function SimpleCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl p-4 backdrop-blur-xl bg-semantic-surface-ghost border border-white/20 shadow ${className}`}>{children}</div>;
}
