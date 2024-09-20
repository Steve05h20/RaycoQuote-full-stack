import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const { rows } = await sql`SELECT * FROM options`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error in /api/options:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}