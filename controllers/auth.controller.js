const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { session,users} = require('../models');
const { authService, userService} = require('../services');
const { generateAccessToken, generateRefreshToken, saveRefreshTokenInCookie } = require('../services/auth.service');
const response = require('../utils/responseTemp');


//CREATE USER
const registerUser = async (req, res) => {
  try {
    const checkEmail = await authService.checkEmail(req);
    if(checkEmail.length){ 
      return res.status(400).json(response('Email or Account already exists!'));
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashed;
    const newUser = await users.create({ ...req.body });
    res.status(200).json(response('Register is successfully!',newUser));
  } catch (error) {
    res.status(500).json(error);
  }
};


//LOGIN User
const loginUser = async (req, res) => {
  try {
    const user = await users.findOne({ where: { account: req.body.account } });
    if (!user) {
      return res.status(404).json(response('Wrong account!'));
    } 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) 
      return res.status(404).json(response('Wrong password!'));  
    if(validPassword) {
      await session.destroy({ where: { user_id: user.id } });
      const newAccessToken = authService.generateAccessToken(user);
      const newRefreshToken = authService.generateRefreshToken(user);
      authService.saveRefreshTokenInCookie(res,newRefreshToken);
      await authService.createSession(user,newRefreshToken,newAccessToken);
      return res.status(200).json(response('Login is successfully!',{user,newAccessToken,newRefreshToken}));
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Request new access Token by refresh Token
const reqRefreshToken = async (req,res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json(response('You are not authentication'));
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN, async (err,user) => {
      await session.destroy({ where: { user_id: user.id } });
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user)
      saveRefreshTokenInCookie(res,refreshToken);
      await authService.createSession(user,newRefreshToken,newAccessToken);
      res.status(200).send(response('Successfully!',newAccessToken));
    })
  } catch (error) {
    res.status(500).json(error);
  }
} 

module.exports = { registerUser, loginUser, reqRefreshToken };
