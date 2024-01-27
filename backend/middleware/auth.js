const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler( async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Missing authentication header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Now you can access decoded.userId
    req.userId = decoded.userId;
  

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message // Use error.message instead of error
    });
  }
});

module.exports = { authMiddleware };