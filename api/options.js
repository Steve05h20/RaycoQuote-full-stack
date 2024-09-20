import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { rows } = await sql`SELECT * FROM options`;
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching options' });
      }
      break;

    case 'POST':
      try {
        const { title, description, image } = req.body;
        const { rows } = await sql`
          INSERT INTO options (title, description, image)
          VALUES (${title}, ${description}, ${image})
          RETURNING *
        `;
        res.status(201).json(rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Error creating option' });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const { title, description, image } = req.body;
        const { rows } = await sql`
          UPDATE options
          SET title = ${title}, description = ${description}, image = ${image}
          WHERE id = ${id}
          RETURNING *
        `;
        if (rows.length === 0) {
          res.status(404).json({ error: 'Option not found' });
        } else {
          res.status(200).json(rows[0]);
        }
      } catch (error) {
        res.status(500).json({ error: 'Error updating option' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const { rowCount } = await sql`DELETE FROM options WHERE id = ${id}`;
        if (rowCount === 0) {
          res.status(404).json({ error: 'Option not found' });
        } else {
          res.status(200).json({ message: 'Option deleted successfully' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error deleting option' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}