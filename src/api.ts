/**
 * API base URL for fetch calls.
 * - Dev: set VITE_API_URL=http://localhost:3001 in .env
 * - Production (same host): leave empty — requests use /api/... on current origin
 */
const configured = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

export const API_BASE =
  configured || (import.meta.env.DEV ? 'http://localhost:3001' : '');

export function apiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${p}` : p;
}
