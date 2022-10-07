const bcrypt = require('bcrypt');
const { users } = require('../models');
const jwt = require('jsonwebtoken');
const { session } = require('../models');


const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashed;
    const newUser = await users.create({ ...req.body });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

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
        const accessToken = await jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: '15s' },
        );
        const refreshToken = await jwt.sign(
          {
            id: user.id,
            admin: user.admin,
          },
          process.env.REFRESH_TOKEN,
          { expiresIn: '7d' },
        );
        res.cookie("refreshToken",refreshToken,{
          httpOnly: true,
          secure: false,
          path:"/",
          sameSite: "strict"
        });
        const createSession = await session.create({
          user_id: user.id,
          refresh_token: refreshToken,
          access_token: accessToken,
        });
        res.status(200).json({ user, accessToken, refreshToken});
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const reqRefreshToken = async (req,res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json("you are not authentication");
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN, async (err,user) => {
      if(err) console.log(err);
      const deleteToken = await session.destroy({ where: { user_id: user.id } });
      const newAccessToken = await jwt.sign(
        {
          id: user.id,
          admin: user.admin,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '15s' },
      );
      const newRefreshToken = await jwt.sign(
        {
          id: user.id,
          admin: user.admin,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '7d' },
      );
      const createSession = await session.create({
        user_id: user.id,
        refresh_token: newRefreshToken,
        access_token: newAccessToken,
      });
      res.status(200).send({accessToken: newAccessToken});
    })
  } catch (error) {
    res.status(500).json(error);
  }
} 

module.exports = { registerUser, loginUser, reqRefreshToken };
