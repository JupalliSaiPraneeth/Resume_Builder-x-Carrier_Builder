import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create certification
router.post('/', async (req, res) => {
  const { resume_id, certification_name, issuing_organization, issue_date, expiry_date, credential_url, credential_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO certifications (resume_id, certification_name, issuing_organization, issue_date, expiry_date, credential_url, credential_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [resume_id, certification_name, issuing_organization, issue_date, expiry_date, credential_url, credential_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all certifications for a resume
router.get('/resume/:resume_id', async (req, res) => {
  const { resume_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM certifications WHERE resume_id = $1 ORDER BY issue_date DESC',
      [resume_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific certification
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM certifications WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update certification
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { certification_name, issuing_organization, issue_date, expiry_date, credential_url, credential_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE certifications 
       SET certification_name = COALESCE($1, certification_name),
           issuing_organization = COALESCE($2, issuing_organization),
           issue_date = COALESCE($3, issue_date),
           expiry_date = COALESCE($4, expiry_date),
           credential_url = COALESCE($5, credential_url),
           credential_id = COALESCE($6, credential_id),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [certification_name, issuing_organization, issue_date, expiry_date, credential_url, credential_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete certification
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM certifications WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    res.status(200).json({ message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
