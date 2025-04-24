import express from 'express';
import {
    getAllContents,
    getContentById,
    getContentsByType,
    createContent,
    updateContent,
    deleteContent
} from '../controllers/contentController.js';

const router = express.Router();

router.get('/', getAllContents);
router.get('/type/:type', getContentsByType);
router.get('/:id', getContentById);
router.post('/', createContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);

export default router;
