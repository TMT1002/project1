const { users, questions, answers } = require('../models');

// GET All Users
const getAllUser = async (req, res) => {
  try {
    const allUser = await users.findAll();
    res.status(200).json(allUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE User by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await users.destroy({ where: { id: [req.params.id] } });
    if (user) {
      res.status(200).json(`Deleted account with id = ${req.params.id}`);
    } else {
      res.status(404).json(`Not found account with id = ${req.params.id}`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//CREATE question
const createQuestion = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newQuestion = await questions.create({
      content: req.body.content,
    });
    answer.forEach(async currentValue => {
      await answers.create({
        question_id: newQuestion.id,
        answer_id: currentValue.answer_id,
        content: currentValue.content,
        correct: currentValue.correct,
      });
    });
    if (!newQuestion) {
      res.status(404).json('Can not add new questions');
    }
    res.status(200).json({ message: 'Created Successfully!', question: req.body });
  } catch (error) {
    res.status(500).json(error);
  }
};

//ADD new question
const addQuestion = async (req, res) => {
  try {
    const { question, answer } = req.body;
    console.log(answer);
    const newQuestion = await questions.create({
      content: req.body.content,
    });
    if (!newQuestion) {
      res.status(404).json('Can not add new questions');
    }
    res.status(200).json('added a question');
  } catch (error) {
    res.status(500).json(error);
  }
};

// ADD answer
const addAnswer = async (req, res) => {
  try {
    console.log(req.body);
    const newAns = await answers.create({ ...req.body });
    if (!newAns) {
      res.status(404).json('Can not add new answer');
    }
    res.status(200).json('added a answer');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUser,
  deleteUserById,
  addQuestion,
  addAnswer,
  createQuestion,
};
