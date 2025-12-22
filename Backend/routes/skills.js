import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create skill
router.post('/', async (req, res) => {
  const { resume_id, category, skill_name, proficiency_level } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO skills (resume_id, category, skill_name, proficiency_level)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [resume_id, category, skill_name, proficiency_level]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Skill already exists for this resume' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get all skills for a resume
router.get('/resume/:resume_id', async (req, res) => {
  const { resume_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM skills WHERE resume_id = $1 ORDER BY category, skill_name',
      [resume_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific skill
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM skills WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update skill
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { skill_name, proficiency_level } = req.body;

  try {
    const result = await pool.query(
      `UPDATE skills 
       SET skill_name = COALESCE($1, skill_name),
           proficiency_level = COALESCE($2, proficiency_level)
       WHERE id = $3 RETURNING *`,
      [skill_name, proficiency_level, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete skill
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.status(200).json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
