// Dummy authentication middleware
export const dummyProtect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader === 'Bearer dummy-token') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized - Invalid or missing token' });
  }
};
