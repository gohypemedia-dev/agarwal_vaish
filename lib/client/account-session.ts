// Client-side session management for Member Account
// Remembers user identifier (phone, registration number, email, or donation ID)
// for 2 days (48 hours) across page visits and refreshes.

const STORAGE_KEY = "avvs_account_session";
const LEGACY_STORAGE_KEY = "avvs_member_identifier";
const EXPIRY_KEY = "avvs_session_expires";
const COOKIE_NAME = "avvs_account_session";
const SESSION_DURATION_MS = 2 * 24 * 60 * 60 * 1000; // 48 hours (2 days)
const COOKIE_MAX_AGE_SECONDS = 2 * 24 * 60 * 60; // 172800 seconds

/**
 * Saves the account identifier in localStorage and a 2-day cookie.
 */
export function saveAccountSession(identifier: string) {
  if (typeof window === "undefined" || !identifier) return;
  const clean = identifier.trim();
  if (!clean) return;

  const expiresAt = Date.now() + SESSION_DURATION_MS;

  try {
    localStorage.setItem(STORAGE_KEY, clean);
    localStorage.setItem(LEGACY_STORAGE_KEY, clean);
    localStorage.setItem(EXPIRY_KEY, String(expiresAt));
  } catch (e) {
    console.warn("[session] localStorage set failed:", e);
  }

  try {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(clean)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
  } catch (e) {
    console.warn("[session] cookie set failed:", e);
  }
}

/**
 * Retrieves the stored account identifier if still within the 2-day session.
 * If expired, clears the session and returns null.
 */
export function getAccountSession(): string | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Check expiration in localStorage
    const expiryStr = localStorage.getItem(EXPIRY_KEY);
    if (expiryStr) {
      const expiresAt = Number(expiryStr);
      if (Date.now() > expiresAt) {
        clearAccountSession();
        return null;
      }
    }

    // 2. Read from localStorage
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (stored && stored.trim()) {
      return stored.trim();
    }

    // 3. Fallback to cookie
    const match = document.cookie.match(new RegExp(`(^|;\\s*)${COOKIE_NAME}=([^;]+)`));
    if (match && match[2]) {
      const val = decodeURIComponent(match[2].trim());
      if (val) {
        // Sync back to localStorage
        saveAccountSession(val);
        return val;
      }
    }
  } catch (e) {
    console.warn("[session] getAccountSession error:", e);
  }

  return null;
}

/**
 * Clears the session from both localStorage and cookie.
 */
export function clearAccountSession() {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  } catch (e) {
    console.warn("[session] localStorage remove failed:", e);
  }

  try {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  } catch (e) {
    console.warn("[session] cookie clear failed:", e);
  }
}
