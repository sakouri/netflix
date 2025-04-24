import pool from '../config/db.config.js';

export const getAllCategories = async (req, res) => {
    try {
        const [categories] = await pool.query('SELECT * FROM categories ORDER BY name');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des catégories", error: error.message });
    }
};
