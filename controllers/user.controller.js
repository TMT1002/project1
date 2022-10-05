const { questions, answers, results } = require('../models');

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
    const {user_id,answers} = req.body.message;
    answers.forEach(async currentValue => {
      await results.create({
        user_id: user_id,
        questions_id: currentValue.question_id,
        answer_id: currentValue.answer_id,
        user_choice: currentValue.user_choice
      });
    });
    res.status(200).json("The answer has been sent successfully!")
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = { getAllQuestion,createAnswer};


