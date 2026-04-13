import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware.js';

const router = Router();

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT key, value FROM site_config ORDER BY key');
  res.json(rows);
});

router.post('/', requireAuth, async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'key required' });
  const { rows } = await pool.query(
    `INSERT INTO site_config (key, value)
     VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
     RETURNING key, value`,
    [key, value ?? null]
  );
  res.json(rows[0]);
});

export default router;
