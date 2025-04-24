import pool from '../config/db.config.js';

export const getAllContents = async (req, res) => {
    try {
        const [contents] = await pool.query(`
            SELECT c.*, cat.name as category_name 
            FROM contents c
            LEFT JOIN categories cat ON c.category_id = cat.id
        `);
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des contenus", error: error.message });
    }
};

export const getContentsByType = async (req, res) => {
    try {
        const [contents] = await pool.query(`
            SELECT c.*, cat.name as category_name 
            FROM contents c
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.type = ?
        `, [req.params.type]);
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des contenus", error: error.message });
    }
};

export const getContentById = async (req, res) => {
    try {
        const [content] = await pool.query(`
            SELECT c.*, cat.name as category_name 
            FROM contents c
            LEFT JOIN categories cat ON c.category_id = cat.id
            WHERE c.id = ?
        `, [req.params.id]);

        if (content.length === 0) {
            return res.status(404).json({ message: "Contenu non trouvé" });
        }

        res.json(content[0]);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du contenu", error: error.message });
    }
};

export const createContent = async (req, res) => {
    try {
        const { title, description, type, release_year, duration, image_url, category_id } = req.body;

        // créer un contenu
        const [result] = await pool.query(
            'INSERT INTO contents (title, description, type, release_year, duration, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, description, type, release_year, duration, image_url, category_id]
        );

        const contentId = result.insertId;
        res.status(201).json({ message: 'Contenu créé avec succès', contentId });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du contenu", error: error.message });
    }
};

export const updateContent = async (req, res) => {
    try {
        const contentId = req.params.id;
        const { title, description, type, release_year, duration, image_url, category_id } = req.body;

        // vérifier si le contenu existe
        const [existingContent] = await pool.query('SELECT * FROM contents WHERE id = ?', [contentId]);
        
        if (existingContent.length === 0) {
            return res.status(404).json({ message: 'Contenu non trouvé' });
        }

        // maj du contenu
        await pool.query(
            'UPDATE contents SET title = ?, description = ?, type = ?, release_year = ?, duration = ?, image_url = ?, category_id = ? WHERE id = ?',
            [title, description, type, release_year, duration, image_url, category_id, contentId]
        );

        res.json({ message: 'Contenu mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du contenu", error: error.message });
    }
};

export const deleteContent = async (req, res) => {
    try {
        const contentId = req.params.id;

        // suppression du contenu
        await pool.query('DELETE FROM contents WHERE id = ?', [contentId]);

        res.json({ message: 'Contenu supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du contenu", error: error.message });
    }
};
