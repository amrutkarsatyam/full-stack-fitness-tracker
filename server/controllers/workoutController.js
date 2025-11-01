// server/controllers/workoutController.js
import { db } from '../store.js';

// Get all workouts (sorted by date, newest first)
export const getWorkouts = (req, res) => {
  const sortedWorkouts = [...db.workouts].sort((a, b) => new Date(b.date) - new Date(a.date));
  res.status(200).json(sortedWorkouts);
};

// Add a new workout
export const addWorkout = (req, res) => {
  const { exerciseName, sets, reps, weight } = req.body;

  const newWorkout = {
    id: Date.now(),
    exerciseName,
    sets: parseInt(sets, 10) || 0,
    reps: parseInt(reps, 10) || 0,
    weight: parseFloat(weight) || 0,
    date: new Date()
  };

  db.workouts.push(newWorkout);
  res.status(201).json(newWorkout);
};

// Delete a workout
export const deleteWorkout = (req, res) => {
  const { id } = req.params;
  const workoutId = parseInt(id, 10);

  db.workouts = db.workouts.filter(workout => workout.id !== workoutId);
  res.status(200).json({ message: 'Workout deleted successfully' });
};
