const {session} = require('../models');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: '2h' },
    );
}

const generateRefreshToken = (user) => {
    return jwt.sign(
    {
        id: user.id,
        admin: user.admin,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: '7d' },
    );
}

const saveRefreshTokenInCookie = (res,refreshToken) => {
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: false,
        path:"/",
        sameSite: "strict"
    });
}
module.exports = {generateAccessToken,generateRefreshToken,saveRefreshTokenInCookie};