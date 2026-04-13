import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { requireAuth } from '../middleware.js';

const router = Router();

// Map allowed MIME types to safe extensions — prevents .html/.php uploads
const SAFE_MIME_EXT = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOADS_DIR || 'uploads'),
  filename: (req, file, cb) => {
    const ext = SAFE_MIME_EXT[file.mimetype] || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (SAFE_MIME_EXT[file.mimetype]) cb(null, true);
    else cb(new Error('Only JPEG, PNG, GIF and WebP images are allowed'));
  },
});

router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const baseUrl = process.env.BETTER_AUTH_URL || 'https://ramcoad.com';
  const url = `${baseUrl}/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
