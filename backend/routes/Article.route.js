import express from 'express';
import ArticleController from '../controllers/Article.controller.js';

const router = express.Router();

router.get('/', ArticleController.getAllArticles);
router.post('/', ArticleController.createArticle);
router.put('/:id', ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);

export default router;