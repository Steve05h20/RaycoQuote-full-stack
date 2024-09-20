import { sql } from '@vercel/postgres';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('Requête reçue:', req.method, req.url);

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Erreur lors du parsing du formulaire:', err);
      return res.status(500).json({ error: 'Erreur lors du traitement du formulaire', details: err.message });
    }

    const { method } = req;
    console.log('Méthode:', method);
    console.log('Champs:', fields);
    console.log('Fichiers:', files);

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
            console.log('Fichier image reçu:', file);

            const fileName = `${Date.now()}-${file.originalFilename}`;
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            
            console.log('Création du dossier uploads...');
            await fs.mkdir(uploadDir, { recursive: true });

            const newPath = path.join(uploadDir, fileName);
            console.log('Déplacement du fichier vers:', newPath);
            await fs.rename(file.filepath, newPath);

            imagePath = `/uploads/${fileName}`;
            console.log('Chemin de l\'image enregistré:', imagePath);
          }

          let result;
          if (method === 'POST') {
            console.log('Insertion dans la base de données...');
            result = await sql`
              INSERT INTO options (title, description, image)
              VALUES (${title}, ${description}, ${imagePath})
              RETURNING *
            `;
          } else {
            const { id } = req.query;
            console.log('Mise à jour dans la base de données pour l\'ID:', id);
            result = await sql`
              UPDATE options
              SET title = ${title}, description = ${description}, 
                  image = COALESCE(${imagePath}, image)
              WHERE id = ${id}
              RETURNING *
            `;
          }

          console.log('Résultat de l\'opération en base de données:', result.rows[0]);
          res.status(method === 'POST' ? 201 : 200).json(result.rows[0]);
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement de l\'option:', error);
          res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'option', details: error.message });
        }
        break;

      case 'DELETE':
        try {
          const { id } = req.query;
          console.log('Tentative de suppression de l\'option avec l\'ID:', id);
          const { rowCount } = await sql`DELETE FROM options WHERE id = ${id}`;
          if (rowCount === 0) {
            console.log('Aucune option trouvée avec l\'ID:', id);
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
        console.log('Méthode non autorisée:', method);
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Méthode ${method} non autorisée`);
    }
  });
}