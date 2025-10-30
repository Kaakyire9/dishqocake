import fs from 'fs';
import path from 'path';

function loadEnv(file) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    // remove surrounding quotes
    if ((val.startsWith("\"") && val.endsWith("\"")) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

loadEnv(path.join(process.cwd(), '.env.local'));

import { createClient } from '@supabase/supabase-js';

async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
    process.exit(2);
  }
  const supabase = createClient(url, anon);

  const email = 'r.aduboffour@gmail.com';
  const password = 'Admin@1234';

  console.log('Attempting signInWithPassword for', email);
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await supabase.auth.signInWithPassword({ email, password });
    console.log('Raw response:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error calling Supabase auth:', err);
  }
}

run();
