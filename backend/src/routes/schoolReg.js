import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware.js';

const router = Router();

// Ensure table exists
async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS school_registrations (
      id SERIAL PRIMARY KEY,
      expected_cutoff VARCHAR(20) NOT NULL,
      name VARCHAR(255) NOT NULL,
      dob VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      student_mobile VARCHAR(20) NOT NULL,
      parent_mobile VARCHAR(20) NOT NULL,
      school_name VARCHAR(500) NOT NULL,
      residential_address TEXT NOT NULL,
      referred_by VARCHAR(255),
      group_studied VARCHAR(100) NOT NULL,
      joined_whatsapp BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}
ensureTable().catch(console.error);

router.post('/', async (req, res) => {
  try {
    const {
      expected_cutoff,
      name,
      dob,
      email,
      student_mobile,
      parent_mobile,
      school_name,
      residential_address,
      referred_by,
      group_studied,
      joined_whatsapp,
    } = req.body;

    if (!expected_cutoff || !name || !dob || !email || !student_mobile || !parent_mobile || !school_name || !residential_address || !group_studied) {
      return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    const { rows } = await pool.query(
      `INSERT INTO school_registrations
         (expected_cutoff, name, dob, email, student_mobile, parent_mobile, school_name, residential_address, referred_by, group_studied, joined_whatsapp)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [expected_cutoff, name, dob, email, student_mobile, parent_mobile, school_name, residential_address, referred_by || null, group_studied, joined_whatsapp ?? false]
    );

    res.status(201).json({ success: true, id: rows[0].id });
  } catch (err) {
    console.error('school_reg error:', err);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Admin: view all registrations
router.get('/', requireAuth, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM school_registrations ORDER BY created_at DESC');
  res.json(rows);
});

// Admin: delete a registration
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query('DELETE FROM school_registrations WHERE id = $1', [id]);
  if (rowCount === 0) return res.status(404).json({ error: 'Registration not found.' });
  res.json({ success: true });
});

export default router;
