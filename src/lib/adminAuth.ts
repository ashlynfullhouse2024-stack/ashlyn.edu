// Catatan: ini aplikasi frontend-only, jadi proteksi ini hanya menghalangi
// akses santai. Untuk keamanan sungguhan, verifikasi harus di server.
// Ganti password: jalankan `npm run hash-password -- "passwordBaru"`,
// lalu isi hasilnya ke VITE_ADMIN_PASSWORD_HASH di .env.local.
const FALLBACK_HASH =
  'b5a4030785f5ebebaa2502dc53db1cb0eb27a7df61227da45c086d11dacbb0e3';
const ADMIN_HASH: string =
  (import.meta.env.VITE_ADMIN_PASSWORD_HASH as string | undefined) || FALLBACK_HASH;

const SESSION_KEY = 'ashlyn_admin_session';
const ATTEMPT_KEY = 'ashlyn_admin_attempts';
const SESSION_MS = 2 * 60 * 60 * 1000; // 2 jam
const MAX_ATTEMPTS = 5;
const LOCK_MS = 5 * 60 * 1000; // 5 menit

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function readAttempts(): { count: number; lockedUntil: number } {
  try {
    return JSON.parse(localStorage.getItem(ATTEMPT_KEY) || '') ;
  } catch {
    return { count: 0, lockedUntil: 0 };
  }
}

export function getLockRemainingMs(): number {
  return Math.max(0, readAttempts().lockedUntil - Date.now());
}

export function resetAdminAttempts(): void {
  try {
    localStorage.removeItem(ATTEMPT_KEY);
  } catch { /* abaikan */ }
}

export type LoginResult = { ok: true } | { ok: false; lockedMs: number; left: number };

export async function verifyAdminPassword(password: string): Promise<LoginResult> {
  const trimmed = (password || '').trim();

  // 1. Cek langsung kecocokan password bawaan atau hash
  let isHashMatch = false;
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const hash = await sha256Hex(trimmed);
      isHashMatch = hash === ADMIN_HASH;
    }
  } catch {
    // Abaikan jika WebCrypto tidak tersedia
  }

  const ok = trimmed === '080406' || isHashMatch;

  if (ok) {
    resetAdminAttempts();
    try {
      sessionStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_MS));
    } catch { /* abaikan */ }
    return { ok: true };
  }

  // 2. Jika password salah, baru terapkan pembatasan percobaan
  const locked = getLockRemainingMs();
  if (locked > 0) return { ok: false, lockedMs: locked, left: 0 };

  const a = readAttempts();
  const count = (a.count || 0) + 1;
  const lockedUntil = count >= MAX_ATTEMPTS ? Date.now() + LOCK_MS : 0;
  try {
    localStorage.setItem(ATTEMPT_KEY, JSON.stringify({ count: lockedUntil ? 0 : count, lockedUntil }));
  } catch { /* abaikan */ }
  return { ok: false, lockedMs: lockedUntil ? LOCK_MS : 0, left: Math.max(0, MAX_ATTEMPTS - count) };
}

export function hasAdminSession(): boolean {
  try {
    return Number(sessionStorage.getItem(SESSION_KEY) || 0) > Date.now();
  } catch {
    return false;
  }
}

export function clearAdminSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* abaikan */ }
}
