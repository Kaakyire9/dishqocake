"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // admin key/state not used in client; authentication handled server-side
  const router = useRouter();

  const onLogin = () => {
    // call server session endpoint which sets an HttpOnly cookie
    (async () => {
      try {
        const res = await fetch('/api/admin/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
        if (res.ok) {
          toast.success('Logged in');
          router.push('/admin');
        } else {
          toast.error('Invalid credentials');
        }
      } catch {
        toast.error('Login failed');
      }
    })();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
      <div className="grid gap-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-3 border rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-3 border rounded" />
  {/* service role key should not be stored in browser; handled server-side */}
        <div className="flex justify-end">
          <button onClick={onLogin} className="bg-pink-600 text-white px-4 py-2 rounded">Login</button>
        </div>
      </div>
    </div>
  );
}
