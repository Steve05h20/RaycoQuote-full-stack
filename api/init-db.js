import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS options (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(255)
      )
    `;
    res.status(200).json({ message: 'Table created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating table' });
  }
}