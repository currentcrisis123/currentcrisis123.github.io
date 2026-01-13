import express from 'express';
import CategoryController from '../controllers/Category.controller.js';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.createCategory);
router.delete('/:name', CategoryController.deleteCategory);

export default router;