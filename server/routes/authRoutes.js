// server/routes/authRoutes.js
import express from 'express';

const router = express.Router();

// open login: always success, returns fake token
router.post('/login', (req, res) => {
  res.status(200).json({
    token: 'fake-token',
    message: 'Logged in successfully (dummy mode)',
  });
});

// optional logout route
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
