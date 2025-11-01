import { db } from '../store.js';

// Get all meals (sorted by date, newest first)
export const getMeals = (req, res) => {
  const sortedMeals = [...db.meals].sort((a, b) => new Date(b.date) - new Date(a.date));
  res.status(200).json(sortedMeals);
};

// Add a new meal
export const addMeal = (req, res) => {
  const { mealDescription, calories } = req.body;
  
  const newMeal = {
    id: Date.now(),
    mealDescription,
    calories: parseInt(calories),
    date: new Date()
  };
  
  db.meals.push(newMeal);
  res.status(201).json(newMeal);
};

// Delete a meal
export const deleteMeal = (req, res) => {
  const { id } = req.params;
  const mealId = parseInt(id);
  
  db.meals = db.meals.filter(meal => meal.id !== mealId);
  res.status(200).json({ message: 'Meal deleted successfully' });
};
