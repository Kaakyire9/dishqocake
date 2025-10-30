import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

// Read admin password from environment. We avoid throwing at import-time so Next.js builds
// won't fail if the environment variable hasn't been configured in the build environment.
// The route handlers will return a helpful 500 response when the value is missing.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: Request) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD environment variable is not set' }, { status: 500 });
  }
  try {
    const body = await req.json();
    // Support two flows:
    // 1) legacy env-password flow: { email, password }
    // 2) supabase auth flow: { access_token }
    const { email, password, access_token } = body as { email?: string; password?: string; access_token?: string };

    // If a Supabase access token is provided, validate it with the server-side Supabase client
    if (access_token) {
      const supabase = getSupabaseServerClient();
      if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
      // validate token and get user
      // supabase.auth.getUser accepts an access token to validate
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - supabase-js types for auth.getUser with token can differ; we handle runtime shape
      const { data, error } = await supabase.auth.getUser(access_token);
      if (error || !data?.user) return NextResponse.json({ error: 'invalid' }, { status: 401 });
      const user = data.user;

      // Optional allowlist: if ADMIN_ALLOWED_EMAILS is set, only allow listed emails
      const allowed = process.env.ADMIN_ALLOWED_EMAILS ? process.env.ADMIN_ALLOWED_EMAILS.split(',').map((s) => s.trim().toLowerCase()) : null;
      if (allowed && (!user.email || !allowed.includes(user.email.toLowerCase()))) {
        return NextResponse.json({ error: 'forbidden' }, { status: 403 });
      }

      const res = NextResponse.json({ ok: true });
      const cookieValue = encodeURIComponent(JSON.stringify({ email: user.email }));
      res.headers.append('Set-Cookie', `admin-session=${cookieValue}; Path=/; HttpOnly; SameSite=Lax`);
      return res;
    }

    // Fallback: legacy static password check
    if (!email || !password) return NextResponse.json({ error: 'bad request' }, { status: 400 });
    if (password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'invalid' }, { status: 401 });

    // create a simple session (signed by the framework cookie store) — store minimal info
    const res = NextResponse.json({ ok: true });
    // set HttpOnly cookie
    const cookieValue = encodeURIComponent(JSON.stringify({ email }));
    res.headers.append('Set-Cookie', `admin-session=${cookieValue}; Path=/; HttpOnly; SameSite=Lax`);
    return res;
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.headers.append('Set-Cookie', `admin-session=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  return res;
}
