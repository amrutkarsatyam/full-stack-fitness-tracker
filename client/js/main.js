import { checkAuth, renderNavbar, getToken } from './auth.js';

// Check authentication
checkAuth();

// Render navbar
renderNavbar('dashboard');

// Fetch and render chart data
const fetchChartData = async () => {
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
    
    // Group workouts by date
    const workoutsByDate = {};
    workouts.forEach(workout => {
      const dateStr = new Date(workout.date).toLocaleDateString();
      workoutsByDate[dateStr] = (workoutsByDate[dateStr] || 0) + 1;
    });
    
    // Prepare data for chart
    const labels = Object.keys(workoutsByDate).slice(0, 7).reverse();
    const data = Object.values(workoutsByDate).slice(0, 7).reverse();
    
    renderChart(labels, data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
  }
};

// Render Chart.js chart
const renderChart = (labels, data) => {
  const ctx = document.getElementById('workoutChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Workouts per Day',
        data: data,
        backgroundColor: '#FFFF00',
        borderColor: '#000000',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            font: {
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          ticks: {
            font: {
              weight: 'bold'
            }
          },
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              weight: 'bold'
            }
          }
        }
      }
    }
  });
};

// Initialize
fetchChartData();
