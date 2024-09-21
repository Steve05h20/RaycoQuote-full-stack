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

  // Utilisation de formidable uniquement pour POST et PUT
  if (req.method === 'POST' || req.method === 'PUT') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Erreur lors du parsing du formulaire:', err);
        return res.status(500).json({ error: 'Erreur lors du traitement du formulaire', details: err.message });
      }

      await handleRequest(req, res, fields, files);
    });
  } else {
    await handleRequest(req, res);
  }
}

async function handleRequest(req, res, fields = {}, files = {}) {
  const { method } = req;
  console.log('Méthode:', method);

  try {
    switch (method) {
      case 'GET':
        await handleGet(res);
        break;
      case 'POST':
        await handlePost(res, fields, files);
        break;
      case 'PUT':
        await handlePut(req, res, fields, files);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
      default:
        console.log('Méthode non autorisée:', method);
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Méthode ${method} non autorisée`);
    }
  } catch (error) {
    console.error(`Erreur lors du traitement de la requête ${method}:`, error);
    res.status(500).json({ error: `Erreur lors du traitement de la requête ${method}`, details: error.message });
  }
}

async function handleGet(res) {
  const { rows } = await sql`SELECT * FROM options`;
  console.log('Options récupérées:', rows);
  res.status(200).json(rows);
}

async function handlePost(res, fields, files) {
  const { title, description } = fields;
  const imagePath = await handleImageUpload(files.image);

  const result = await sql`
    INSERT INTO options (title, description, image)
    VALUES (${title}, ${description}, ${imagePath})
    RETURNING *
  `;

  console.log('Option créée:', result.rows[0]);
  res.status(201).json(result.rows[0]);
}

async function handlePut(req, res, fields, files) {
  const { id } = req.query;
  const { title, description } = fields;
  const imagePath = await handleImageUpload(files.image);

  const result = await sql`
    UPDATE options
    SET title = ${title}, description = ${description}, 
        image = COALESCE(${imagePath}, image)
    WHERE id = ${id}
    RETURNING *
  `;

  if (result.rows.length === 0) {
    res.status(404).json({ error: 'Option non trouvée' });
  } else {
    console.log('Option mise à jour:', result.rows[0]);
    res.status(200).json(result.rows[0]);
  }
}

async function handleDelete(req, res) {
  const { id } = req.query;
  const { rowCount } = await sql`DELETE FROM options WHERE id = ${id}`;
  
  if (rowCount === 0) {
    res.status(404).json({ error: 'Option non trouvée' });
  } else {
    res.status(200).json({ message: 'Option supprimée avec succès' });
  }
}

async function handleImageUpload(file) {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.originalFilename}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  await fs.mkdir(uploadDir, { recursive: true });

  const newPath = path.join(uploadDir, fileName);
  await fs.rename(file.filepath, newPath);

  return `/uploads/${fileName}`;
}