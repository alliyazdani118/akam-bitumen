import pg from 'pg';

/**
 * Postgres access for the newsletter and enquiry forms.
 *
 * The connection string comes from the environment (local infrastructure in
 * the sandbox, a managed database in any other deployment).
 */
const connectionString =
  process.env.DATABASE_URL || 'postgres://akam:akam_local_dev@localhost:5432/akam';

export const pool = new pg.Pool({ connectionString, max: 5 });

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS subscribers (
    id         serial PRIMARY KEY,
    email      text NOT NULL UNIQUE,
    source     text NOT NULL DEFAULT 'website',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id         serial PRIMARY KEY,
    name       text NOT NULL,
    email      text NOT NULL,
    phone      text,
    company    text,
    message    text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  );
`;

/** Idempotent — safe to run on every boot. */
export async function migrate() {
  await pool.query(SCHEMA);
}

/** Waits for the database to accept connections before the API serves traffic. */
export async function waitForDatabase({ attempts = 20, delayMs = 1500 } = {}) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await pool.query('SELECT 1');
      return;
    } catch (error) {
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
