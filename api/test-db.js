import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT NOW()`;
    res.status(200).json({ message: 'Database connected', time: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
}