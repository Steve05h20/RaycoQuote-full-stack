import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { method } = req;
  console.log('Méthode reçue:', method);
  console.log('Corps de la requête:', req.body);

  switch (method) {
    case 'GET':
      try {
        const { rows } = await sql`SELECT * FROM options`;
        console.log('Options récupérées:', rows);
        res.status(200).json(rows);
      } catch (error) {
        console.error('Erreur lors de la récupération des options:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des options', details: error.message });
      }
      break;

    case 'POST':
      try {
        const { title, description, image } = req.body;
        console.log('Tentative d\'insertion:', { title, description, image });
        const { rows } = await sql`
          INSERT INTO options (title, description, image)
          VALUES (${title}, ${description}, ${image})
          RETURNING *
        `;
        console.log('Option insérée:', rows[0]);
        res.status(201).json(rows[0]);
      } catch (error) {
        console.error('Erreur lors de la création de l\'option:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'option', details: error.message });
      }
      break;

    // ... autres cas ...
  }
}