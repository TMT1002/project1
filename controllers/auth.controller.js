const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { session,users} = require('../models');
const { authService, userService} = require('../services');
const { generateAccessToken, generateRefreshToken, saveRefreshTokenInCookie } = require('../services/auth.service');
const Op = require('Sequelize').Op;


//CREATE USER
const registerUser = async (req, res) => {
  try {
    const checkEmail = await authService.checkEmail(req);
    if(checkEmail.length){ 
      return res.status(400).json({message: "Email or Account already exists!"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashed;
    const newUser = await users.create({ ...req.body });
    res.status(200).json({message: "Register is successfully!",data: newUser});
  } catch (error) {
    res.status(500).json(error);
  }
};


//LOGIN User
const loginUser = async (req, res) => {
  try {
    const user = await users.findOne({ where: { account: req.body.account } });
    if (!user) {
      return res.status(404).json({message: 'Wrong account!'});
    } 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) 
      return res.status(404).json({message: 'Wrong password!'});  
    if(validPassword) {
      const deleteToken = await session.destroy({ where: { user_id: user.id } });
      const newAccessToken = authService.generateAccessToken(user);
      const newRefreshToken = authService.generateRefreshToken(user);
      authService.saveRefreshTokenInCookie(res,newRefreshToken);
      const createSession = await authService.createSession(user,newRefreshToken,newAccessToken);
      return res.status(200).json({message: "Login is successfully!",user,newAccessToken,newRefreshToken});
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Request new access Token by refresh Token
const reqRefreshToken = async (req,res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({message: "You are not authentication"});
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN, async (err,user) => {
      if(err) console.log(err);
      const deleteToken = await session.destroy({ where: { user_id: user.id } });
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user)
      await saveRefreshTokenInCookie(res,refreshToken);
      const createSession = await authService.createSession(user,newRefreshToken,newAccessToken);
      res.status(200).send({message: "Successfully!", accessToken: newAccessToken});
    })
  } catch (error) {
    res.status(500).json(error);
  }
} 

module.exports = { registerUser, loginUser, reqRefreshToken };
