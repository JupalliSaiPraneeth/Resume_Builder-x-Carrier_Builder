import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create project
router.post('/', async (req, res) => {
  const { resume_id, title, description, tech_stack, github_link, start_date, end_date, is_ongoing } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO projects (resume_id, title, description, tech_stack, github_link, start_date, end_date, is_ongoing)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [resume_id, title, description, tech_stack, github_link, start_date, end_date, is_ongoing || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all projects for a resume
router.get('/resume/:resume_id', async (req, res) => {
  const { resume_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE resume_id = $1 ORDER BY created_at DESC',
      [resume_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific project
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, tech_stack, github_link, start_date, end_date, is_ongoing } = req.body;

  try {
    const result = await pool.query(
      `UPDATE projects 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           tech_stack = COALESCE($3, tech_stack),
           github_link = COALESCE($4, github_link),
           start_date = COALESCE($5, start_date),
           end_date = COALESCE($6, end_date),
           is_ongoing = COALESCE($7, is_ongoing),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [title, description, tech_stack, github_link, start_date, end_date, is_ongoing, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
