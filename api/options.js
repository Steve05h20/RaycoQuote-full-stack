import { sql } from '@vercel/postgres';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  const fileName = Date.now() + '-' + file.name;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
  fs.writeFileSync(filePath, data);
  fs.unlinkSync(file.path);
  return `/uploads/${fileName}`;
};

export default async function handler(req, res) {
  const { method } = req;
  console.log('Méthode reçue:', method);

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Erreur lors du parsing du formulaire:', err);
      return res.status(500).json({ error: 'Erreur lors du traitement du formulaire' });
    }

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
          const { title, description } = fields;
          let imagePath = null;

          if (files.image) {
            imagePath = await saveFile(files.image);
          }

          console.log('Tentative d\'insertion:', { title, description, imagePath });
          const { rows } = await sql`
            INSERT INTO options (title, description, image)
            VALUES (${title}, ${description}, ${imagePath})
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
          const { title, description } = fields;
          let imagePath = null;

          if (files.image) {
            imagePath = await saveFile(files.image);
          }

          console.log('Tentative de mise à jour:', { id, title, description, imagePath });
          const { rows } = await sql`
            UPDATE options
            SET title = ${title}, description = ${description}, image = COALESCE(${imagePath}, image)
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
  });
}