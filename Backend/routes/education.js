import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create education record
router.post('/', async (req, res) => {
  const { resume_id, institution_name, degree, field_of_study, cgpa, start_year, pass_out_year, description } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO education (resume_id, institution_name, degree, field_of_study, cgpa, start_year, pass_out_year, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [resume_id, institution_name, degree, field_of_study, cgpa, start_year, pass_out_year, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all education records for a resume
router.get('/resume/:resume_id', async (req, res) => {
  const { resume_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM education WHERE resume_id = $1 ORDER BY pass_out_year DESC',
      [resume_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific education record
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM education WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Education record not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update education record
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { institution_name, degree, field_of_study, cgpa, start_year, pass_out_year, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE education 
       SET institution_name = COALESCE($1, institution_name),
           degree = COALESCE($2, degree),
           field_of_study = COALESCE($3, field_of_study),
           cgpa = COALESCE($4, cgpa),
           start_year = COALESCE($5, start_year),
           pass_out_year = COALESCE($6, pass_out_year),
           description = COALESCE($7, description),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [institution_name, degree, field_of_study, cgpa, start_year, pass_out_year, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Education record not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete education record
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM education WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Education record not found' });
    }

    res.status(200).json({ message: 'Education record deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
