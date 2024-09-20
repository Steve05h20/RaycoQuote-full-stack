import { sql } from '@vercel/postgres';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Erreur lors du parsing du formulaire:', err);
      return res.status(500).json({ error: 'Erreur lors du traitement du formulaire' });
    }

    const { method } = req;
    console.log('Méthode reçue:', method);

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
      case 'PUT':
        try {
          const { title, description } = fields;
          let imagePath = null;

          if (files.image) {
            const file = files.image;
            const fileName = `${Date.now()}-${file.name}`;
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            await fs.mkdir(uploadDir, { recursive: true });
            const newPath = path.join(uploadDir, fileName);
            await fs.rename(file.path, newPath);
            imagePath = `/uploads/${fileName}`;
          }

          let result;
          if (method === 'POST') {
            result = await sql`
              INSERT INTO options (title, description, image)
              VALUES (${title}, ${description}, ${imagePath})
              RETURNING *
            `;
          } else {
            const { id } = req.query;
            result = await sql`
              UPDATE options
              SET title = ${title}, description = ${description}, image = ${imagePath}
              WHERE id = ${id}
              RETURNING *
            `;
          }

          console.log('Option enregistrée:', result.rows[0]);
          res.status(method === 'POST' ? 201 : 200).json(result.rows[0]);
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement de l\'option:', error);
          res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'option', details: error.message });
        }
        break;

      case 'DELETE':
        try {
          const { id } = req.query;
          const { rowCount } = await sql`DELETE FROM options WHERE id = ${id}`;
          if (rowCount === 0) {
            res.status(404).json({ error: 'Option non trouvée' });
          } else {
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
  });
}