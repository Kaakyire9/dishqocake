"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onLogout() {
    setLoading(true);
    try {
      await fetch('/api/admin/session', { method: 'DELETE' });
    } catch {
      // ignore network errors — we'll redirect to login anyway
    }
    // force navigation to login which will show the unauthenticated state
    router.push('/admin/login');
  }

  return (
    <button
      onClick={onLogout}
      className="px-3 py-2 rounded hover:bg-semantic-accent-gold/8 text-left"
      disabled={loading}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
