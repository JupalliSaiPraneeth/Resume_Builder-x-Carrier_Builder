import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

// Import route modules
import userRoutes from './routes/users.js';
import resumeRoutes from './routes/resumes.js';
import educationRoutes from './routes/education.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import internshipRoutes from './routes/internships.js';
import certificationRoutes from './routes/certifications.js';
import personalDetailsRoutes from './routes/personalDetails.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('[SERVER] Starting Resume Builder API...');
console.log(`[SERVER] Database Host: ${process.env.DB_HOST || 'localhost'}`);
console.log(`[SERVER] Database Port: ${process.env.DB_PORT || 5000}`);
console.log(`[SERVER] Database Name: ${process.env.DB_NAME || 'resume_builder'}`);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/personal-details', personalDetailsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Resume Builder API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('[DB] Connection test failed:', err.message);
  } else {
    console.log('[DB] Connection test successful');
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] Resume Builder API running on port ${PORT}`);
});
