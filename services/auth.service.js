const {session} = require('../models');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    try {
        return jwt.sign(
            {
              id: user.id,
              admin: user.admin,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: '2h' },
        );
    } catch (error) {
        res.status(500).json(error);
    }
}

const generateRefreshToken = (user) => {
    try {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: '7d' },
        );
    } catch (error) {
        res.status(500).json(error);
    }
}

const saveRefreshTokenInCookie = (res,refreshToken) => {
    try {
        res.cookie("refreshToken",refreshToken,{
            httpOnly: true,
            secure: false,
            path:"/",
            sameSite: "strict"
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = {generateAccessToken,generateRefreshToken,saveRefreshTokenInCookie};