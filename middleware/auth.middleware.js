const jwt = require('jsonwebtoken');
const {session} = require('../models')

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, async (err, user) => {
      if (err) return res.status(403).json('Token is not validate');
      const findTokenInDB = await session.findOne({where: {user_id : user.id }})
      if(!findTokenInDB){
        return res.status(403).json('Token is not validate');
      }
      req.user = user;
      next();
    });
  } else{
    return res.status(401).json('You are not authenticated!');
  }
  } catch (error) {
    res.status(500).json(error);
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
