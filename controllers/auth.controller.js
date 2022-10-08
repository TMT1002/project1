const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { session,users} = require('../models');
const { authService} = require('../services');
const { generateAccessToken, generateRefreshToken, saveRefreshTokenInCookie } = require('../services/auth.service');
const Op = require('Sequelize').Op;


//CREATE USER
const registerUser = async (req, res) => {
  try {
    const checkEmail = await users.findAll({
      where : {
        [Op.or]: [
          {email: { [Op.eq]: req.body.email}},
          {account: {[Op.eq] :req.body.account}}
        ]
      }
    })
    if(checkEmail.length){ 
      return res.status(400).json("Email or Account already exists!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashed;
    const newUser = await users.create({ ...req.body });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};


//LOGIN User
const loginUser = async (req, res) => {
  try {
    const user = await users.findOne({ where: { account: req.body.account } });
    if (!user) {
      res.status(404).json('Wrong account!');
    } else {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        res.status(404).json('Wrong password!');
      }
      if(validPassword) {
        const deleteToken = await session.destroy({ where: { user_id: user.id } });
        const newAccessToken = authService.generateAccessToken(user);
        const newRefreshToken = authService.generateRefreshToken(user);
        authService.saveRefreshTokenInCookie(res,newRefreshToken);
        const createSession = await session.create({
          user_id: user.id,
          refresh_token: newRefreshToken,
          access_token: newAccessToken,
        });
        res.status(200).json({user,newAccessToken,newRefreshToken});
      }
    };
  } catch (error) {
    res.status(500).json(error);
  }
};

// Request new access Token by refresh Token
const reqRefreshToken = async (req,res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json("you are not authentication");
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN, async (err,user) => {
      if(err) console.log(err);
      const deleteToken = await session.destroy({ where: { user_id: user.id } });
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user)
      await saveRefreshTokenInCookie(res,refreshToken);
      res.status(200).send({accessToken: newAccessToken});
    })
  } catch (error) {
    res.status(500).json(error);
  }
} 

module.exports = { registerUser, loginUser, reqRefreshToken };
