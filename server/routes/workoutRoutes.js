import express from 'express';
import { getWorkouts, addWorkout, deleteWorkout } from '../controllers/workoutController.js';
import { dummyProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes in this file
router.use(dummyProtect);

router.get('/', getWorkouts);
router.post('/', addWorkout);
router.delete('/:id', deleteWorkout);

export default router;
