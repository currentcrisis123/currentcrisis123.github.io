import express from 'express';
import PatchNotesController from '../controllers/PatchNotes.controller.js';

const router = express.Router();

router.get('/', PatchNotesController.getAllArticles);
router.post('/', PatchNotesController.createArticle);
router.delete('/:id', PatchNotesController.deleteArticle);

export default router;