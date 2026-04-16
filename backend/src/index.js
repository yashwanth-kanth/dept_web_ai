import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node';
import { auth } from './auth.js';
import configRouter from './routes/config.js';
import eventsRouter from './routes/events.js';
import partnersRouter from './routes/partners.js';
import uploadRouter from './routes/upload.js';
import schoolRegRouter from './routes/schoolReg.js';
import { rateLimit } from 'express-rate-limit';

// Per-account login lockout (5 failures in 15 min → locked 15 min)
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;
// Clean up stale entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, rec] of loginAttempts) {
    if ((!rec.lockedUntil || now > rec.lockedUntil) && now - rec.firstAttempt > WINDOW_MS) {
      loginAttempts.delete(email);
    }
  }
}, 30 * 60 * 1000);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://ramcoad.com';

// Trust nginx reverse proxy for real client IPs
app.set('trust proxy', 1);

// Remove stack fingerprint
app.disable('x-powered-by');

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// CORS — only allow the frontend origin
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// Rate limiting on auth endpoints (20 requests/minute per IP)
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/auth', authLimiter);

app.use(express.json());

// Serve uploaded files statically
const uploadsDir = path.resolve(__dirname, '..', process.env.UPLOADS_DIR || 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Per-account login lockout middleware
app.post('/api/auth/sign-in/email', (req, res, next) => {
  const email = req.body?.email?.toLowerCase?.();
  if (!email) return next();

  const now = Date.now();
  const rec = loginAttempts.get(email);

  if (rec?.lockedUntil && now < rec.lockedUntil) {
    const remaining = Math.ceil((rec.lockedUntil - now) / 60000);
    return res.status(429).json({ error: `Account locked due to too many failed attempts. Try again in ${remaining} minute(s).` });
  }

  // Intercept response to track success/failure
  const origEnd = res.end.bind(res);
  res.end = function (chunk, ...args) {
    if (res.statusCode >= 400) {
      const entry = loginAttempts.get(email) || { count: 0, firstAttempt: now };
      if (now - entry.firstAttempt > WINDOW_MS) {
        entry.count = 1;
        entry.firstAttempt = now;
        delete entry.lockedUntil;
      } else {
        entry.count++;
      }
      if (entry.count >= MAX_ATTEMPTS) {
        entry.lockedUntil = now + LOCKOUT_MS;
      }
      loginAttempts.set(email, entry);
    } else {
      loginAttempts.delete(email);
    }
    return origEnd(chunk, ...args);
  };

  next();
});

// Block open self-registration — must be an existing signed-in admin
app.post('/api/auth/sign-up/email', async (req, res, next) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session) {
      return res.status(403).json({ error: 'Registration is restricted. Contact an existing administrator.' });
    }
    next();
  } catch {
    return res.status(403).json({ error: 'Registration is restricted.' });
  }
});

// Auth routes
app.all('/api/auth/*', toNodeHandler(auth));

// API routes
app.use('/api/config', configRouter);
app.use('/api/events', eventsRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/school-reg', schoolRegRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Bind to localhost only — not reachable from other machines on the network
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Backend running on http://127.0.0.1:${PORT}`);
});
