// server/middleware/authMiddleware.js
export const dummyProtect = (req, res, next) => {
  // accept any "Authorization" header or even none at all
  req.user = { id: 1, name: 'Test User' };
  next();
};
