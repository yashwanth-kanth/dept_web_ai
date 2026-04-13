import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware.js';

const router = Router();

const mapRow = (row) => ({
  id: row.id,
  title: row.title,
  date: row.date,
  venue: row.venue,
  description: row.description,
  speakers: row.speakers,
  image: row.image,
  gallery: row.gallery || [],
  tag: row.tag,
  color: row.color,
  status: row.status,
  isFeatured: row.is_featured,
  rsvps_count: row.rsvps_count,
  _creationTime: row.created_at,
  _id: String(row.id),
});

router.get('/', async (req, res) => {
  const { status } = req.query;
  if (status) {
    const { rows } = await pool.query(
      'SELECT * FROM events WHERE status = $1 ORDER BY created_at DESC',
      [status]
    );
    return res.json(rows.map(mapRow));
  }
  const { rows } = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
  res.json(rows.map(mapRow));
});

router.post('/', requireAuth, async (req, res) => {
  const { title, date, venue, description, speakers, image, gallery, tag, color, status, isFeatured, rsvps_count } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO events (title, date, venue, description, speakers, image, gallery, tag, color, status, is_featured, rsvps_count)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
    [title, date, venue, description, speakers ?? null, image ?? null,
     JSON.stringify(gallery ?? []), tag ?? null, color ?? null,
     status ?? 'upcoming', isFeatured ?? false, rsvps_count ?? 0]
  );
  res.status(201).json(mapRow(rows[0]));
});

router.patch('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, date, venue, description, speakers, image, gallery, tag, color, status, isFeatured, rsvps_count } = req.body;
  const { rows } = await pool.query(
    `UPDATE events SET
       title=$1, date=$2, venue=$3, description=$4, speakers=$5, image=$6,
       gallery=$7, tag=$8, color=$9, status=$10, is_featured=$11, rsvps_count=$12
     WHERE id=$13 RETURNING *`,
    [title, date, venue, description, speakers ?? null, image ?? null,
     JSON.stringify(gallery ?? []), tag ?? null, color ?? null,
     status ?? 'upcoming', isFeatured ?? false, rsvps_count ?? 0, id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  res.json(mapRow(rows[0]));
});

router.delete('/:id', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM events WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

export default router;
