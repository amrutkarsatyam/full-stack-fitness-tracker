// server/routes/nutritionRoutes.js
import express from 'express';
import { getMeals, addMeal, deleteMeal } from '../controllers/nutritionController.js';
import { dummyProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// protect nutrition endpoints
router.use(dummyProtect);

router.get('/', getMeals);
router.post('/', addMeal);
router.delete('/:id', deleteMeal);

export default router;
