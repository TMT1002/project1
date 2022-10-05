const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(403).json('Token is not validate');
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json('You are not authenticated!');
  }
};

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.admin) {
      next();
    } else {
      res.status(403).json('You are not admin.');
    }
  });
};

module.exports = { verifyToken, verifyTokenAdmin };
