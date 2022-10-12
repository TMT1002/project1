const { questions, answers, results, data, session, users} = require('../models');
const { unlock } = require('../routes/v1/user.route');
const {userService} = require('../services')
const pagination = require('../services/pagination');

//GET all question
const getAllQuestion = async (req, res) => {
  try {
    const {page,size} = req.query;
    const { limit, offset } = pagination.getPagination(parseInt(page), parseInt(size));

    const data = await questions.findAndCountAll({
      attributes: ['id','content'],
      offset: offset,
      limit: limit,
      include: {
        model: answers,
        attributes: ['answer_id','content']
      }
    })
    const allQuestions = pagination.getPagingData(data, page, limit);

    if (!allQuestions) {
      res.status(404).json({message: "Can not get all question!"});
    }
    res.status(200).json({message: "Get data Successfully!",data: allQuestions});
  } catch (error) {
    res.status(500).json(error);
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
    res.status(200).json({message: "Submit successfully"})
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
    res.status(200).json({message: "Get data Successfully!",userID: req.user.id, data: getResultBySession});
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
      email: req.body.email
    },
    {
      where: {
        id: req.user.id
      }
    });
    if(!updateUser){
      return res.status(404).json({message: "User not found!"});
    }
      return res.status(200).json({message: "Update successfully!"})
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
      res.status(200).json({message: "Logout successfully!"});
    } 
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {getAllQuestion,getResults,submit,logout,updateUser};

