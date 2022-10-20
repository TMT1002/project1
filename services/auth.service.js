const {session,users} = require('../models');
const jwt = require('jsonwebtoken');
const Op = require('Sequelize').Op;

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
        throw error;
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
        throw error;
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
        throw error;
    }
}

const checkEmail = async(req) => {
    try {
        const checkEmail = await users.findAll({
            where : {
              [Op.or]: [
                {email: { [Op.eq]: req.body.email}},
                {account: {[Op.eq] :req.body.account}}
              ]
            }
        })
        return checkEmail;
    } catch (error) {
        throw error;
    }
}

const createSession = async (user,newRefreshToken,newAccessToken) => {
    try {
        const createSession = await session.create({
            user_id: user.id,
            refresh_token: newRefreshToken,
            access_token: newAccessToken,
        });
        return createSession
    } catch (error) {
        throw error;
    }
}


module.exports = {generateAccessToken,generateRefreshToken,saveRefreshTokenInCookie,checkEmail,createSession};



