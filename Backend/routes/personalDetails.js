import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create personal details
router.post('/', async (req, res) => {
  const { resume_id, full_name, email, phone, linkedin_url, github_url, location, professional_summary } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO personal_details (resume_id, full_name, email, phone, linkedin_url, github_url, location, professional_summary)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [resume_id, full_name, email, phone, linkedin_url, github_url, location, professional_summary]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get personal details by resume_id
router.get('/resume/:resume_id', async (req, res) => {
  const { resume_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM personal_details WHERE resume_id = $1',
      [resume_id]
    );
    res.status(200).json(result.rows[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update personal details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone, linkedin_url, github_url, location, professional_summary } = req.body;

  try {
    const result = await pool.query(
      `UPDATE personal_details 
       SET full_name = COALESCE($1, full_name),
           email = COALESCE($2, email),
           phone = COALESCE($3, phone),
           linkedin_url = COALESCE($4, linkedin_url),
           github_url = COALESCE($5, github_url),
           location = COALESCE($6, location),
           professional_summary = COALESCE($7, professional_summary),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [full_name, email, phone, linkedin_url, github_url, location, professional_summary, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Personal details not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete personal details
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM personal_details WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Personal details not found' });
    }

    res.status(200).json({ message: 'Personal details deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
