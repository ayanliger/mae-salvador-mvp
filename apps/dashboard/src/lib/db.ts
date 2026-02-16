import { Pool } from "pg";

// ── e-SUS replica (read-only) ──────────────────────────

let _esusPool: Pool | null = null;

export function getEsusPool(): Pool {
  if (!_esusPool) {
    _esusPool = new Pool({
      connectionString: process.env.ESUS_DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });

    // Enforce read-only at the session level
    _esusPool.on("connect", (client) => {
      client.query("SET default_transaction_read_only = ON");
    });
  }
  return _esusPool;
}

// ── Mãe Salvador application DB (read-write) ──────────

let _appPool: Pool | null = null;

export function getAppPool(): Pool {
  if (!_appPool) {
    _appPool = new Pool({
      connectionString: process.env.APP_DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return _appPool;
}
