import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create user
router.post('/', async (req, res) => {
  const { email, password_hash } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, password_hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get user by email
router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, email, created_at FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
