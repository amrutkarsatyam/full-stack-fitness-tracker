// Auth utility functions

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
export const checkAuth = () => {
  const token = getToken();
  if (!token) {
    window.location.href = '/login.html';
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
};

// Render navbar
export const renderNavbar = (currentPage) => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  navbar.innerHTML = `
    <div class="navbar-links">
      <a href="/index.html" class="navbar-link ${currentPage === 'dashboard' ? 'active' : ''}">Dashboard</a>
      <a href="/track.html" class="navbar-link ${currentPage === 'track' ? 'active' : ''}">Track</a>
    </div>
    <button id="logout-button" class="neo-button-sml">Logout</button>
  `;
  
  // Attach logout event listener
  const logoutBtn = document.getElementById('logout-button');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
};

// Login page logic
if (window.location.pathname.includes('login.html')) {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = '/index.html';
        } else {
          errorMessage.textContent = data.message || 'Login failed';
        }
      } catch (error) {
        errorMessage.textContent = 'Network error. Please try again.';
        console.error('Login error:', error);
      }
    });
  }
}
