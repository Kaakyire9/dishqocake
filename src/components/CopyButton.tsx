"use client";

import React from 'react';
import { toast } from "@/lib/toast";

export default function CopyButton({ text }: { text: string }) {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    } catch {
      // ignore clipboard errors in some browsers
      toast.error('Failed to copy');
    }
  };

  return (
  <button onClick={onCopy} className="bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-3 py-2 rounded">Copy</button>
  );
}
