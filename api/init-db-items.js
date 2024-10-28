import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Suppression de la table si elle existe déjà
    await sql`DROP TABLE IF EXISTS items`;
    
    // Création de la nouvelle table items
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
        type VARCHAR(50) NOT NULL CHECK (type IN ('options', 'installations')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Ajout d'un index pour optimiser les requêtes par type
    await sql`CREATE INDEX idx_items_type ON items(type)`;

    res.status(200).json({ 
      success: true,
      message: 'Table items créée avec succès',
      details: 'Table et index créés'
    });
  } catch (error) {
    console.error('Erreur d\'initialisation de la table items:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur lors de la création de la table items',
      details: error.message
    });
  }
}