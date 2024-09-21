import { sql } from '@vercel/postgres';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { method } = req;
  console.log('Méthode reçue:', method);

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Erreur lors du parsing du formulaire:', err);
      return res.status(500).json({ error: 'Erreur lors du traitement du formulaire', details: err.message });
    }

    console.log('Champs reçus:', fields);
    console.log('Fichiers reçus:', files);

    switch (method) {
      case 'POST':
        try {
          const { title, description } = fields;
          let imageBuffer = null;

          if (files.image) {
            console.log('Fichier image reçu:', files.image);
            imageBuffer = fs.readFileSync(files.image.path);
          }

          console.log('Tentative d\'insertion:', { title, description, imageBufferLength: imageBuffer ? imageBuffer.length : 0 });
          const { rows } = await sql`
            INSERT INTO options (title, description, image)
            VALUES (${title}, ${description}, ${imageBuffer})
            RETURNING id, title, description
          `;
          console.log('Option insérée:', rows[0]);
          res.status(201).json(rows[0]);
        } catch (error) {
          console.error('Erreur détaillée lors de la création de l\'option:', error);
          res.status(500).json({ error: 'Erreur lors de la création de l\'option', details: error.message });
        }
        break;

      case 'GET':
        try {
          if (req.query.id) {
            // Récupérer une option spécifique avec son image
            const { rows } = await sql`SELECT * FROM options WHERE id = ${req.query.id}`;
            if (rows.length > 0) {
              const option = rows[0];
              if (option.image) {
                res.setHeader('Content-Type', 'image/jpeg'); // Ajustez selon le type d'image
                res.send(option.image);
              } else {
                res.status(404).json({ error: 'Image non trouvée' });
              }
            } else {
              res.status(404).json({ error: 'Option non trouvée' });
            }
          } else {
            // Récupérer toutes les options sans les images
            const { rows } = await sql`SELECT id, title, description FROM options`;
            console.log('Options récupérées:', rows);
            res.status(200).json(rows);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des options:', error);
          res.status(500).json({ error: 'Erreur lors de la récupération des options', details: error.message });
        }
        break;

      case 'PUT':
        try {
          const { id } = req.query;
          const { title, description } = fields;
          let imageBuffer = null;

          if (files.image) {
            console.log('Nouveau fichier image reçu:', files.image);
            imageBuffer = fs.readFileSync(files.image.path);
          }

          let query;
          let values;

          if (imageBuffer) {
            query = sql`
              UPDATE options
              SET title = ${title}, description = ${description}, image = ${imageBuffer}
              WHERE id = ${id}
              RETURNING id, title, description
            `;
          } else {
            query = sql`
              UPDATE options
              SET title = ${title}, description = ${description}
              WHERE id = ${id}
              RETURNING id, title, description
            `;
          }

          const { rows } = await query;

          if (rows.length === 0) {
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