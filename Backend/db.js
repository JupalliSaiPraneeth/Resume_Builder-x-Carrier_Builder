import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'resume_builder',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5000,
  connectTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20,
});

pool.on('error', (err) => {
  console.error('[DB] Unexpected error on idle client', err);
});

pool.on('connect', () => {
  console.log('[DB] Successfully connected to PostgreSQL');
});

export default pool;
