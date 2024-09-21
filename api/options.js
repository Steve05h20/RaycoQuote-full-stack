import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { method } = req;
  console.log('Méthode reçue:', method);
  console.log('Corps de la requête:', req.body);
  console.log('Query params:', req.query);

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

    case 'PUT':
      try {
        const { id } = req.query;
        const { title, description, image } = req.body;
        console.log('Tentative de mise à jour:', { id, title, description, image });
        const { rows } = await sql`
          UPDATE options
          SET title = ${title}, description = ${description}, image = ${image}
          WHERE id = ${id}
          RETURNING *
        `;
        if (rows.length === 0) {
          console.log('Option non trouvée pour la mise à jour');
          res.status(404).json({ error: 'Option non trouvée' });
        } else {
          console.log('Option mise à jour:', rows[0]);
          res.status(200).json(rows[0]);
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'option:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'option', details: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        console.log('Tentative de suppression de l\'option avec l\'ID:', id);
        const { rowCount } = await sql`DELETE FROM options WHERE id = ${id}`;
        console.log('Nombre de lignes supprimées:', rowCount);
        if (rowCount === 0) {
          console.log('Option non trouvée pour la suppression');
          res.status(404).json({ error: 'Option non trouvée' });
        } else {
          console.log('Option supprimée avec succès');
          res.status(200).json({ message: 'Option supprimée avec succès' });
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'option:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'option', details: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Méthode ${method} non autorisée`);
  }
}