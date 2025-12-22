import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create internship
router.post('/', async (req, res) => {
  const { resume_id, company_name, position, description, start_date, end_date, is_ongoing, duration_months } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO internships (resume_id, company_name, position, description, start_date, end_date, is_ongoing, duration_months)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [resume_id, company_name, position, description, start_date, end_date, is_ongoing || false, duration_months]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all internships for a resume
router.get('/resume/:resume_id', async (req, res) => {
  const { resume_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM internships WHERE resume_id = $1 ORDER BY start_date DESC',
      [resume_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific internship
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM internships WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Internship not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update internship
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { company_name, position, description, start_date, end_date, is_ongoing, duration_months } = req.body;

  try {
    const result = await pool.query(
      `UPDATE internships 
       SET company_name = COALESCE($1, company_name),
           position = COALESCE($2, position),
           description = COALESCE($3, description),
           start_date = COALESCE($4, start_date),
           end_date = COALESCE($5, end_date),
           is_ongoing = COALESCE($6, is_ongoing),
           duration_months = COALESCE($7, duration_months),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [company_name, position, description, start_date, end_date, is_ongoing, duration_months, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete internship
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM internships WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    res.status(200).json({ message: 'Internship deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
