// Authentication controller
export const loginUser = (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'user' && password === 'pass') {
    res.status(200).json({
      username: 'user',
      token: 'dummy-token'
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

export const signupUser = (req, res) => {
  res.status(400).json({ message: 'Signup is not supported in dummy mode.' });
};
