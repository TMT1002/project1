const { Promise } = require('sequelize');
const { questions, answers, results, data } = require('../models');

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

// CREATE answer
const createAnswer = async (req,res) => {
  try {
    let checkAnswer = 1, select = [], answer_true = [];
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
      if(check[0].dataValues.correct)
      answer_true.push(check[0].dataValues.answer_id);
      if(answer[i].user_choice == true)
      select.push(answer[i].answer_id);
      if(answer[i].answer_id == 1){
        await data.destroy({ where: {user_id: user_id,question_id: answer[i].question_id} });
        await data.create({
          user_id: user_id,
          question_id: answer[i].question_id,
          user_choice: String(select),
          answer_correct: String(answer_true),
          correct : checkAnswer
        });
        console.log(select);
        checkAnswer = 1;
        select = [], answer_true = [];
      }
    }
    res.status(200).json("Created answer successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET results
const getResult = async (req,res) => {
  try {
    const result = await questions.findAll({ 
      attributes: ["id","content"],
      include: [{
        model: data,
        attributes: ["user_choice","answer_correct","correct"]
      }] 
    });
    const correct = await data.findAll({
      attributes: ["correct"],
      where: {user_id:[req.params.id]}
    });
    let numberCorrect = 0, score = 0;
    correct.forEach((value) => {
      if(value.dataValues.correct)
      numberCorrect++;
    });
    score = numberCorrect*100/correct.length;
    res.status(200).json({user_id: req.params.id,data: result, score:score});
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = {getAllQuestion,createAnswer,getResult};


