import express from 'express';
import DevelopersController from '../controllers/Developers.controller.js';

const router = express.Router();

router.get('/', DevelopersController.getDevelopers);
router.post('/', DevelopersController.createDeveloper);
router.delete('/:id', DevelopersController.deleteDeveloper);

export default router;