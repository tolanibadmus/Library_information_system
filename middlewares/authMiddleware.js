const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers['x-access-token'];

  const jwtSecret = process.env.JWT_SECRET;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'A token is required for authentication',
    });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.decoded = decoded;
  } catch (err) {
    return res.json({
      success: false,
      message: 'User not logged in',
    });
  }
  next();
}

module.exports = authMiddleware;
