"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';
import { createClient } from '@supabase/supabase-js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onLogin = () => {
    (async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        // If Supabase public keys are available, try Supabase auth first
        if (url && anonKey) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const supabase = createClient(url, anonKey) as any;
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error || !data?.session) {
            toast.error('Invalid email or password');
            return;
          }
          const accessToken = data.session.access_token;
          // Exchange token with server to set secure cookie
          const res = await fetch('/api/admin/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ access_token: accessToken }) });
          if (res.ok) {
            toast.success('Logged in');
            router.push('/admin');
          } else if (res.status === 403) {
            toast.error('Account not authorized for admin');
          } else {
            toast.error('Login failed');
          }
          return;
        }

        // Fallback to legacy server-side static password flow
        const res = await fetch('/api/admin/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
        if (res.ok) {
          toast.success('Logged in');
          router.push('/admin');
        } else {
          toast.error('Invalid credentials');
        }
      } catch (err) {
        console.error(err);
        toast.error('Login failed');
      }
    })();
  };

  return (
    <div className="max-w-md mx-auto bg-semantic-surface-card rounded-2xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
      <div className="grid gap-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-3 border rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-3 border rounded" />
        <div className="flex justify-end">
          <button onClick={onLogin} className="bg-semantic-btn-cta hover:bg-semantic-btn-cta-hover text-white px-4 py-2 rounded">Login</button>
        </div>
      </div>
    </div>
  );
}
