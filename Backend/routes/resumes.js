import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Create a new resume
router.post('/', async (req, res) => {
  console.log('[POST /api/resumes] Received request body:', JSON.stringify(req.body));
  const { user_id, title } = req.body;

  try {
    if (!user_id) {
      console.warn('[POST /api/resumes] Missing user_id');
      return res.status(400).json({ error: 'user_id is required' });
    }

    console.log('[POST /api/resumes] Attempting to insert resume for user:', user_id);
    const result = await pool.query(
      'INSERT INTO resumes (user_id, title) VALUES ($1, $2) RETURNING *',
      [user_id, title || 'My Resume']
    );
    console.log('[POST /api/resumes] Resume created successfully:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('[POST /api/resumes] Database error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get all resumes for a user
router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM resumes WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific resume by ID with all related data
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Get resume details
    const resumeResult = await pool.query(
      'SELECT * FROM resumes WHERE id = $1',
      [id]
    );

    if (resumeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const resume = resumeResult.rows[0];

    // Get all related data in parallel
    const [personal, education, projects, skills, internships, certifications] = await Promise.all([
      pool.query('SELECT * FROM personal_details WHERE resume_id = $1', [id]),
      pool.query('SELECT * FROM education WHERE resume_id = $1 ORDER BY pass_out_year DESC', [id]),
      pool.query('SELECT * FROM projects WHERE resume_id = $1 ORDER BY created_at DESC', [id]),
      pool.query('SELECT * FROM skills WHERE resume_id = $1 ORDER BY category', [id]),
      pool.query('SELECT * FROM internships WHERE resume_id = $1 ORDER BY start_date DESC', [id]),
      pool.query('SELECT * FROM certifications WHERE resume_id = $1 ORDER BY issue_date DESC', [id]),
    ]);

    res.status(200).json({
      ...resume,
      personal_details: personal.rows[0] || null,
      education: education.rows,
      projects: projects.rows,
      skills: skills.rows,
      internships: internships.rows,
      certifications: certifications.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update resume title
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const result = await pool.query(
      'UPDATE resumes SET title = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [title, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a resume (cascades to all related data)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM resumes WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
