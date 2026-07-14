import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres123@localhost:5432/omnishield',
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL error:', err);
});

export default pool;