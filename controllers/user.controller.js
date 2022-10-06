const { questions, answers, results, scores } = require('../models');

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
  }
};

//CREATE answer
const createAnswer = async (req,res) => {
  try {
    let checkAnswer = 1, select = [];
    const {user_id,answer} = req.body.message;
    await results.destroy({ where: {user_id: user_id } });
    for(let i = answer.length - 1; i >=0; i--){
      await results.create({
        user_id: user_id,
        questions_id: answer[i].question_id,
        answer_id: answer[i].answer_id,
        user_choice: answer[i].user_choice
      });
      const check = await answers.findAll({where: {question_id: [answer[i].question_id], answer_id: [answer[i].answer_id] }}); 
      if(check[0].dataValues.correct != answer[i].user_choice){
        checkAnswer = 0;
      }
      if(answer[i].user_choice == true){
        select.push(answer[i].answer_id);
      }
      if(answer[i].answer_id == 1){
        await scores.create({
          user_id: user_id,
          question_id: answer[i].question_id,
          user_choice: String(select),
          correct : checkAnswer
        });
        console.log(select);
        checkAnswer = 1;
        select = [];
      }
    }
    res.status(200).json("Created answer successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getResult = async (req,res) => {
  try {
    const result = await scores.findAll({ where: { user_id: [1] } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = { getAllQuestion,createAnswer,getResult};


