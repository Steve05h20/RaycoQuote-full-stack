import { sql } from '@vercel/postgres';

// Cette fonction crée ou recrée la table items
async function initializeTable() {
  try {
    // Drop table if exists pour un nouveau départ
    await sql`DROP TABLE IF EXISTS items`;
    
    // Créer la nouvelle table
    await sql`
      CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        title_en VARCHAR(255),
        title_es VARCHAR(255),
        description TEXT,
        description_en TEXT,
        description_es TEXT,
        image VARCHAR(255),
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la table:', error);
    return false;
  }
}

export default async function handler(req, res) {
  const { method } = req;
  const { type, id } = req.query;

  // Log pour debug
  console.log('Method:', method);
  console.log('Type:', type);
  console.log('ID:', id);
  console.log('Body:', req.body);

  // Validation du type
  if (!type || !['options', 'installations'].includes(type)) {
    return res.status(400).json({
      error: 'Type invalide. Utilisez "options" ou "installations"'
    });
  }

  try {
    switch (method) {
      case 'GET':
        const { rows } = await sql`
          SELECT * FROM items 
          WHERE type = ${type}
          ORDER BY created_at DESC
        `;
        return res.status(200).json(rows);

      case 'POST':
        {
          const {
            title,
            title_en,
            title_es,
            description,
            description_en,
            description_es,
            image
          } = req.body;

          // Validation du titre
          if (!title) {
            return res.status(400).json({
              error: 'Le titre est requis'
            });
          }

          const result = await sql`
            INSERT INTO items (
              title, title_en, title_es,
              description, description_en, description_es,
              image, type
            ) VALUES (
              ${title}, ${title_en || null}, ${title_es || null},
              ${description || null}, ${description_en || null}, ${description_es || null},
              ${image || null}, ${type}
            )
            RETURNING *
          `;

          return res.status(201).json(result.rows[0]);
        }

      case 'PUT':
        {
          if (!id) {
            return res.status(400).json({
              error: 'ID manquant pour la mise à jour'
            });
          }

          const {
            title,
            title_en,
            title_es,
            description,
            description_en,
            description_es,
            image
          } = req.body;

          const result = await sql`
            UPDATE items
            SET
              title = ${title},
              title_en = ${title_en || null},
              title_es = ${title_es || null},
              description = ${description || null},
              description_en = ${description_en || null},
              description_es = ${description_es || null},
              image = ${image || null}
            WHERE id = ${id} AND type = ${type}
            RETURNING *
          `;

          if (result.rows.length === 0) {
            return res.status(404).json({
              error: 'Item non trouvé'
            });
          }

          return res.status(200).json(result.rows[0]);
        }

      case 'DELETE':
        {
          if (!id) {
            return res.status(400).json({
              error: 'ID manquant pour la suppression'
            });
          }

          const result = await sql`
            DELETE FROM items
            WHERE id = ${id} AND type = ${type}
            RETURNING *
          `;

          if (result.rows.length === 0) {
            return res.status(404).json({
              error: 'Item non trouvé'
            });
          }

          return res.status(200).json({
            message: 'Item supprimé avec succès',
            id: id
          });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({
          error: `Méthode ${method} non autorisée`
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    if (error.message.includes('relation "items" does not exist')) {
      // Si la table n'existe pas, on l'initialise
      const initialized = await initializeTable();
      if (initialized) {
        // On réessaie la requête une fois
        return handler(req, res);
      }
    }
    return res.status(500).json({
      error: 'Erreur lors du traitement de la requête',
      details: error.message
    });
  }
}