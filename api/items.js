import { sql } from '@vercel/postgres';

// Création de la structure de table mise à jour
export const initializeDatabase = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        title_en VARCHAR(255),
        title_es VARCHAR(255),
        description TEXT,
        description_en TEXT,
        description_es TEXT,
        image VARCHAR(255),
        type VARCHAR(50) NOT NULL
      )
    `;
    return { success: true, message: 'Table created successfully' };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error: 'Error creating table' };
  }
};

export default async function handler(req, res) {
  const { method } = req;
  const { type } = req.query; // 'options' ou 'installations'

  console.log('Méthode reçue:', method);
  console.log('Type:', type);
  console.log('Corps de la requête:', req.body);
  console.log('Query params:', req.query);

  if (!['options', 'installations'].includes(type)) {
    return res.status(400).json({ error: 'Type invalide. Utilisez "options" ou "installations"' });
  }

  switch (method) {
    case 'GET':
      try {
        const { rows } = await sql`
          SELECT * FROM items 
          WHERE type = ${type}
          ORDER BY id ASC
        `;
        console.log(`${type} récupérés:`, rows);
        res.status(200).json(rows);
      } catch (error) {
        console.error(`Erreur lors de la récupération des ${type}:`, error);
        res.status(500).json({ 
          error: `Erreur lors de la récupération des ${type}`, 
          details: error.message 
        });
      }
      break;

    case 'POST':
      try {
        const { 
          title, title_en, title_es,
          description, description_en, description_es,
          image 
        } = req.body;

        console.log('Tentative d\'insertion:', req.body);
        
        const { rows } = await sql`
          INSERT INTO items (
            title, title_en, title_es,
            description, description_en, description_es,
            image, type
          )
          VALUES (
            ${title}, ${title_en}, ${title_es},
            ${description}, ${description_en}, ${description_es},
            ${image}, ${type}
          )
          RETURNING *
        `;
        
        console.log('Item inséré:', rows[0]);
        res.status(201).json(rows[0]);
      } catch (error) {
        console.error(`Erreur lors de la création de l'item ${type}:`, error);
        res.status(500).json({ 
          error: `Erreur lors de la création de l'item ${type}`, 
          details: error.message 
        });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const { 
          title, title_en, title_es,
          description, description_en, description_es,
          image 
        } = req.body;

        console.log('Tentative de mise à jour:', { id, ...req.body });
        
        const { rows } = await sql`
          UPDATE items
          SET 
            title = ${title},
            title_en = ${title_en},
            title_es = ${title_es},
            description = ${description},
            description_en = ${description_en},
            description_es = ${description_es},
            image = ${image}
          WHERE id = ${id} AND type = ${type}
          RETURNING *
        `;

        if (rows.length === 0) {
          console.log(`${type} non trouvé pour la mise à jour`);
          res.status(404).json({ error: `${type} non trouvé` });
        } else {
          console.log(`${type} mis à jour:`, rows[0]);
          res.status(200).json(rows[0]);
        }
      } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'item ${type}:`, error);
        res.status(500).json({ 
          error: `Erreur lors de la mise à jour de l'item ${type}`, 
          details: error.message 
        });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        console.log(`Tentative de suppression de l'item ${type} avec l'ID:`, id);
        
        const { rowCount } = await sql`
          DELETE FROM items 
          WHERE id = ${id} AND type = ${type}
        `;
        
        console.log('Nombre de lignes supprimées:', rowCount);
        
        if (rowCount === 0) {
          console.log(`${type} non trouvé pour la suppression`);
          res.status(404).json({ error: `${type} non trouvé` });
        } else {
          console.log(`${type} supprimé avec succès`);
          res.status(200).json({ message: `${type} supprimé avec succès` });
        }
      } catch (error) {
        console.error(`Erreur lors de la suppression de l'item ${type}:`, error);
        res.status(500).json({ 
          error: `Erreur lors de la suppression de l'item ${type}`, 
          details: error.message 
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Méthode ${method} non autorisée`);
  }
}