const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const getTokenFromHeader = (req) => {
  if (req.headers.authorization?.startsWith('Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

module.exports = {
  generateToken,
  verifyToken,
  getTokenFromHeader,
};