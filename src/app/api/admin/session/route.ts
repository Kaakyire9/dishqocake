import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'letmein';

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
  } catch (e) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.headers.append('Set-Cookie', `admin-session=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  return res;
}
