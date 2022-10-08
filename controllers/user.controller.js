const { questions, answers, results, data} = require('../models');

//GET all question
const getAllQuestion = async (req, res) => {
  try {
    const allQuestions = await questions.findAll({ include: answers });
    if (!allQuestions) {
      res.status(404).json('Can not get all question!');
    }
    res.status(200).json(allQuestions);
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
    res.status(200).json("Submit successfully")
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

//GET results
const getResults = async (req,res) => {
  try {
    const getAllResultById = await results.findAll({
      attributes: ["session","score"],
      where: {
        user_id: req.user.id
      }
    });
    const getResultBySession = await Promise.all(getAllResultById.map(async(currentValue)=> {
      return new Promise(async(resolve,reject) => {
        const getResultAnswersInSession = await data.findAll({
          attributes: ["question_id","user_choice","answer_correct","correct"],
          where: {
            session: currentValue.dataValues.session
          }
        });
        const val = getResultAnswersInSession.map((value)=> value.dataValues);
        resolve({session: currentValue.dataValues.session,score: currentValue.dataValues.score , results: val});
      });
    }));
    res.status(200).json({userID: req.user.id, data: getResultBySession});
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {getAllQuestion,getResults,submit};

