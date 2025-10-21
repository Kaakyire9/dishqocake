import { headers } from 'next/headers';

export async function getAdminSession() {
  try {
    const hdrs = await headers();
    const cookieHeader = hdrs.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader
        .split(';')
        .map((c: string) => {
          const [k, ...v] = c.split('=');
          return [k?.trim(), v.join('=')];
        })
        .filter(Boolean)
    );
    const raw = cookies['admin-session'];
    if (!raw) return null;
    try {
      const v = decodeURIComponent(raw as string);
      return JSON.parse(v as string);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}
