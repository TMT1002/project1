const { answers, results, data, session, users} = require('../models');
const {userService} = require('../services')
const pagination = require('../services/pagination');
const response = require('../utils/responseTemp');
const mailer = require('../utils/mailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

//GET myInfo
const getMyInfo = async (req,res) => {
  try {
    const myInfo = await users.findOne({where: {id: req.user.id}});
    const {password,...data} = myInfo.dataValues;
    res.status(200).json(response("Get info successfully!",data))
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

//GET all question
const getAllQuestion = async (req, res) => {
  try {
    const {page,size} = req.query;
    const { limit, offset } = pagination.getPagination(parseInt(page), parseInt(size));
    const data = await userService.getQuestions(req,offset,limit);
    console.log(data);
    const allQuestions = pagination.getPagingData(data, page, limit);

    if (!allQuestions) {
      return res.status(404).json(response('Can not get all question!'));
    } else{
      res.status(200).json(response('Get data Successfully!',allQuestions));
    }
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  };
};

//Create answer
const submit = async (req,res) => {
  try {
    const {userId,answerQuestions} = req.body;
    const sessionAnswer = await data.findOne({where: {user_id: userId}, order: [["session","DESC"]]});
    let countSession = 0, countQuestion = 0, countCorrectAnswer = 0;
    if(sessionAnswer) countSession = sessionAnswer.dataValues.session + 1;
    const result = await Promise.all(answerQuestions.map(async (answer) => {
      return new Promise(async(resolve,reject) => {
        countQuestion++;
        const correctAnswers = await answers.findAll({where: {question_id:answer.question_id,correct:true}});
        const correctChoices = correctAnswers.map(value => value.answer_id).sort();
        let check = (correctChoices.length == answer.choices.length) && (answer.choices.sort().every((value,index) => value === correctChoices[index]))  
        if(check) countCorrectAnswer++;
        const newData = await data.create({
          user_id: userId,
          question_id: answer.question_id,
          user_choice: JSON.stringify(answer.choices),
          answer_correct: JSON.stringify(correctChoices),
          correct: check,
          session : countSession
        });
        return resolve(newData);
      })
    }));
    const saveScores = await results.create({
      user_id: userId,
      score: 100*countCorrectAnswer/countQuestion,
      session: countSession
    });
    res.status(200).json(response('Submit successfully'));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

//GET results
const getResults = async (req,res) => {
  try {
    const getAllResultById = await userService.getAllResultById(req);
    const getResultBySession = await Promise.all(getAllResultById.map(async(currentValue)=> {
      return new Promise(async(resolve,reject) => {
        const getResultAnswersInSession = await userService.getResultAnswersInSession(req,currentValue.dataValues.session);
        const val = await userService.getDataQuestions(getResultAnswersInSession);
        resolve({session: currentValue.dataValues.session,score: currentValue.dataValues.score , results: val});
      });
    }));
    res.status(200).json(response('Get data Successfully!',{userID: req.user.id, data: getResultBySession}));
  } catch (error) {
    res.status(500).json(error);
  }
}

//UPDATE user
const updateUser = async (req,res) => {
  try {
    const updateUser = await users.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      avatar: req.body.avatar
    },
    {
      where: {
        id: req.user.id
      }
    });
    if(!updateUser){
      return res.status(404).json(response('User not found!'));
    }
      return res.status(200).json(response('Update successfully!'));
  } catch (error) {
    res.status(500).json(error);
  }
};

//LOGOUT user
const logout = async (req,res) => {
  try {
    res.clearCookie("refreshToken")
    const logout = await session.destroy({where: {user_id:req.user.id}});
    if(logout){
      res.status(200).json(response('Logout successfully!'));
    } 
  } catch (error) {
    res.status(500).json(error);
  }
}

//UPLOAD image
const uploadImage = async (req, res) => {
  try {
    if(req.file)
    res.status(200).json(response('Upload image is successfully!',req.file.path));
  } catch (error) {
    res.status(500).json(response(`Error uploading image: ${error}`));
  }
}

//Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const findEmail = await users.findOne({where: {email: req.body.email}});
    if (!findEmail) return res.status(404).json(response('Wrong email !'))
    const forgotPassword = jwt.sign({email: req.body.email},
      process.env.FORGOT_PASSWORD,
      { expiresIn: '2h' },
    );
    await mailer.sendMail(req.body.email,'Reset Password',`http://localhost:8000/v1/user/forgot?token=${forgotPassword}`);
    res.status(200).json(response('Sended Successfully!'));
  } catch (error) {
    res.status(500).json(response(`Error: ${error}`));
  }
}

//Reset Password
const resetPassword = async (req, res) => {
  try {
    jwt.verify(req.query.token, process.env.FORGOT_PASSWORD, async (err, data) => {
      if (err) return res.status(403).json(response('Token has expired'));
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash('default', salt);
      await users.update({password: newPassword},
      { where: { email: data.email }})
      res.status(200).json(response('Reset password successfully!'));
    });
  } catch (error) {
    res.status(500).json(response(`Error: ${error}`));
  }
}

module.exports = {
  getAllQuestion,getResults,
  submit,logout,
  updateUser,uploadImage,
  getMyInfo, forgotPassword,
  resetPassword
};

