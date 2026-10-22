import express from 'express';
import { migrate, pool, waitForDatabase } from './db.js';

const PORT = Number(process.env.PORT || 4000);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 120, email: 200, phone: 40, company: 160, message: 4000 };

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

function text(value, max) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch {
    res.status(503).json({ ok: false, error: 'Database unavailable' });
  }
});

/** Stores a newsletter subscription. Re-subscribing refreshes the timestamp. */
app.post('/api/newsletter', async (req, res) => {
  const email = text(req.body?.email, LIMITS.email).toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    res.status(400).json({ error: 'Please provide a valid email address.' });
    return;
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO subscribers (email)
            VALUES ($1)
       ON CONFLICT (email)
       DO UPDATE SET updated_at = now()
         RETURNING id, email, created_at, updated_at`,
      [email],
    );
    res.status(201).json({ ok: true, subscriber: rows[0] });
  } catch (error) {
    console.error('newsletter insert failed', error);
    res.status(503).json({ error: 'We could not save your subscription. Please try again shortly.' });
  }
});

/** Stores a contact / quote-request enquiry. */
app.post('/api/inquiries', async (req, res) => {
  const payload = {
    name: text(req.body?.name, LIMITS.name),
    email: text(req.body?.email, LIMITS.email).toLowerCase(),
    phone: text(req.body?.phone, LIMITS.phone),
    company: text(req.body?.company, LIMITS.company),
    message: text(req.body?.message, LIMITS.message),
  };

  if (!payload.name || !payload.email || !payload.message) {
    res.status(400).json({ error: 'Name, email address and message are required.' });
    return;
  }
  if (!EMAIL_PATTERN.test(payload.email)) {
    res.status(400).json({ error: 'Please provide a valid email address.' });
    return;
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO enquiries (name, email, phone, company, message)
            VALUES ($1, $2, $3, $4, $5)
         RETURNING id, created_at`,
      [payload.name, payload.email, payload.phone || null, payload.company || null, payload.message],
    );
    res.status(201).json({ ok: true, enquiry: rows[0] });
  } catch (error) {
    console.error('enquiry insert failed', error);
    res.status(503).json({ error: 'We could not send your enquiry. Please try again shortly.' });
  }
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
});

// Malformed JSON and other unexpected failures.
app.use((error, _req, res, _next) => {
  console.error('unhandled request error', error);
  res.status(500).json({ error: 'Unexpected server error.' });
});

async function start() {
  await waitForDatabase();
  await migrate();

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`AKAM BITUMEN API listening on port ${PORT}`);
  });

  const shutdown = (signal) => {
    console.log(`Received ${signal}, shutting down`);
    server.close(() => pool.end().then(() => process.exit(0)));
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

start().catch((error) => {
  console.error('API failed to start', error);
  process.exit(1);
});
