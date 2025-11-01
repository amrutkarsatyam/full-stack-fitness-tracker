// client/js/track.js
import { checkAuth, renderNavbar, getToken } from './auth.js';

// Check authentication
checkAuth();

// Render navbar
renderNavbar('track');

// Fetch workouts
const fetchWorkouts = async () => {
  try {
    const response = await fetch('/api/workouts', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch workouts');
    }

    const workouts = await response.json();
    renderWorkoutList(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }
};

// Fetch meals
const fetchMeals = async () => {
  try {
    const response = await fetch('/api/nutrition', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch meals');
    }

    const meals = await response.json();
    renderMealList(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
  }
};

// Render workout list
const renderWorkoutList = (workouts) => {
  const workoutList = document.getElementById('workout-list');
  if (!workoutList) return;

  workoutList.innerHTML = '';

  if (!Array.isArray(workouts) || workouts.length === 0) {
    workoutList.innerHTML = '<p>No workouts yet. Add your first workout!</p>';
    return;
  }

  workouts.forEach(workout => {
    const card = document.createElement('div');
    card.className = 'list-item-card';
    card.innerHTML = `
      <div class="list-item-content">
        <strong>${workout.exerciseName}</strong>
        <p>Sets: ${workout.sets} | Reps: ${workout.reps} | Weight: ${workout.weight} lbs</p>
        <p style="font-size: 0.8rem; color: #666;">${new Date(workout.date).toLocaleString()}</p>
      </div>
      <button class="neo-button-sml delete-workout" data-id="${workout.id}">Delete</button>
    `;
    workoutList.appendChild(card);
  });
};

// Render meal list
const renderMealList = (meals) => {
  const mealList = document.getElementById('nutrition-list');
  if (!mealList) return;

  mealList.innerHTML = '';

  if (!Array.isArray(meals) || meals.length === 0) {
    mealList.innerHTML = '<p>No meals yet. Add your first meal!</p>';
    return;
  }

  meals.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'list-item-card';
    card.innerHTML = `
      <div class="list-item-content">
        <strong>${meal.mealDescription}</strong>
        <p>Calories: ${meal.calories}</p>
        <p style="font-size: 0.8rem; color: #666;">${new Date(meal.date).toLocaleString()}</p>
      </div>
      <button class="neo-button-sml delete-meal" data-id="${meal.id}">Delete</button>
    `;
    mealList.appendChild(card);
  });
};

// Handle delete
const handleDelete = async (endpoint, id) => {
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete');
    }

    // Refresh both lists to keep things in sync
    await fetchWorkouts();
    await fetchMeals();
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

// Workout form submit (unchanged besides guard)
const workoutForm = document.getElementById('workout-form');
if (workoutForm) {
  workoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const exerciseName = document.getElementById('exerciseName').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weight = document.getElementById('weight').value;

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ exerciseName, sets, reps, weight })
      });

      if (!response.ok) {
        throw new Error('Failed to add workout');
      }

      workoutForm.reset();
      fetchWorkouts();
    } catch (error) {
      console.error('Error adding workout:', error);
      alert('Failed to add workout. Please try again.');
    }
  });
}

// Nutrition form submit
const nutritionForm = document.getElementById('nutrition-form');
if (nutritionForm) {
  nutritionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const mealDescription = document.getElementById('mealDescription').value;
    const calories = document.getElementById('calories').value;

    try {
      const response = await fetch('/api/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ mealDescription, calories })
      });

      if (!response.ok) {
        throw new Error('Failed to add meal');
      }

      nutritionForm.reset();
      fetchMeals();
    } catch (error) {
      console.error('Error adding meal:', error);
      alert('Failed to add meal. Please try again.');
    }
  });
}

// Delegate delete clicks
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.matches('.delete-workout')) {
    const id = target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this workout?')) {
      handleDelete(`/api/workouts/${id}`, id);
    }
  } else if (target.matches('.delete-meal')) {
    const id = target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this meal?')) {
      handleDelete(`/api/nutrition/${id}`, id);
    }
  }
});

// Initialize
fetchWorkouts();
fetchMeals();
