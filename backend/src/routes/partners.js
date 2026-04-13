import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware.js';

const router = Router();

const mapRow = (row) => ({
  id: row.id,
  _id: String(row.id),
  name: row.name,
  logo: row.logo,
  image: row.image,
  icon: row.icon,
  tags: row.tags || [],
  order: row.order,
});

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM partners ORDER BY "order" ASC NULLS LAST, id ASC');
  res.json(rows.map(mapRow));
});

router.post('/', requireAuth, async (req, res) => {
  const { name, logo, image, icon, tags, order } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO partners (name, logo, image, icon, tags, "order")
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, logo, image ?? null, icon ?? null, JSON.stringify(tags ?? []), order ?? null]
  );
  res.status(201).json(mapRow(rows[0]));
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM partners WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

export default router;
