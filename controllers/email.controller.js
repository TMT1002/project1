const mailer = require('../utils/mailer');
const response = require('../utils/responseTemp');
const {users,verifyTokens} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyEmail = async (req,res) => {
    try {
        const user = await users.findOne({ where: {id: req.user.id}});
        const verifyToken = jwt.sign(
            {
              id: req.user.id,
              email: user.email
            },
            process.env.VERIFY_TOKEN,
            { expiresIn: '2h' },
          );
          await verifyTokens.create({
            verifyToken: verifyToken,
            user_id: req.user.id,
            email: user.email
          });
        await mailer.sendMail(user.email,'verifyEmail',`http://localhost:8000/v1/user/confirmationEmail?token=${verifyToken}`);
        res.status(200).json(response('Successfully!'));
    } catch (error) {
        res.status(500).json(response(error));
    }
}

const confirmationEmail = async (req, res) => {
    try {
        const token = req.query.token;
        const findtoken = await verifyTokens.findOne({
            where: {
                verifyToken: token
            }
        })
        if(!findtoken) return res.status(400).json(response('Not found verify token!'));
        jwt.verify(token, process.env.VERIFY_TOKEN, async (err, data) => {
            if (err) return res.status(403).json(response('Token has expired'));
        });
        await users.update({emailVerify: true},{
            where: {
                id: findtoken.user_id
        }})
        await verifyTokens.destroy({where: {user_id: findtoken.user_id}});
        res.status(200).json(response('Email confirmed successfully'));
    } catch (error) {
        res.status(500).json(response(error));
    }
}

module.exports = {
    verifyEmail,
    confirmationEmail
}
