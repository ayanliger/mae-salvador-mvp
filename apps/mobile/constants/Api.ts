/**
 * Base URL for the Mãe Salvador API (served by the dashboard's Next.js API routes).
 * In development, this points to the local dev server.
 * For production, update to the deployed dashboard URL.
 */
export const API_BASE_URL = __DEV__
  ? "http://localhost:3000"
  : "https://mae-salvador.vercel.app";
