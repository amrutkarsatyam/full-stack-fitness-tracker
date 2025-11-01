// In-memory database
export const db = {
  workouts: [
    {
      id: 1704067200000,
      exerciseName: 'Bench Press',
      sets: 3,
      reps: 10,
      weight: 135,
      date: new Date('2024-01-01T10:00:00')
    },
    {
      id: 1704153600000,
      exerciseName: 'Squats',
      sets: 4,
      reps: 8,
      weight: 185,
      date: new Date('2024-01-02T11:30:00')
    }
  ],
  meals: [
    {
      id: 1704067200001,
      mealDescription: 'Grilled Chicken with Rice',
      calories: 650,
      date: new Date('2024-01-01T12:00:00')
    },
    {
      id: 1704153600001,
      mealDescription: 'Protein Shake',
      calories: 250,
      date: new Date('2024-01-02T08:00:00')
    }
  ]
};
