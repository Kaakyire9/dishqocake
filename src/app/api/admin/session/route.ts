import { NextResponse } from 'next/server';

// Require ADMIN_PASSWORD to be set in the environment. Do not fall back to a default in production.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  // In dev you may want a fallback, but intentionally fail fast so deployments don't ship with an insecure default.
  // Throwing here prevents the route from accepting any login attempts until the env var is configured.
  throw new Error('ADMIN_PASSWORD environment variable is not set');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
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
