// server/routes/authRoutes.js
import express from 'express';
// Import your controller functions
import { loginUser, signupUser } from '../controllers/authController.js';

const router = express.Router();

// Use the controller function for login
router.post('/login', loginUser);

// (Optional but good practice) Wire up the signup controller too
router.post('/signup', signupUser);

// optional logout route
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;