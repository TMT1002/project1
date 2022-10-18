const { users, questions, answers } = require('../models');
const { userService } = require('../services');
const pagination = require('../services/pagination');
const response = require('../utils/responseTemp');

// GET All Users
const getAllUser = async (req, res) => {
  try {
    const {page,size} = req.query;
    const { limit, offset } = pagination.getPagination(parseInt(page), parseInt(size));
    const data = await users.findAndCountAll({
      offset: offset,
      limit: limit,
    })
    const allUser = pagination.getPagingData(data, page, limit);

    if (!allUser) {
      res.status(404).json(response('Can not get all users!'));
    }
    res.status(200).json(response('Get data Successfully!',allUser));
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE User by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await users.destroy({ where: { id: [req.params.id] } });
    if (user) {
      res.status(200).json(response(`Deleted account with id = ${req.params.id}`));
    } else {
      res.status(404).json(response(`Not found account with id = ${req.params.id}`));
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//CREATE question
const createQuestion = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newQuestion = await userService.createQuestion(req,answer);
    if (!newQuestion) {
      res.status(404).json(response('Can not add new questions'));
    }
    res.status(200).json(response('Created Successfully!',req.body));
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
      res.status(404).json(response('Can not add new questions'));
    }
    res.status(200).json(response('added a question'));
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
      res.status(404).json(response('Can not add new answer'));
    }
    res.status(200).json(response('added a answer'));
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllQuestionsByAdmin = async (req, res) => {
  try {
    const {page,size} = req.query;
    const { limit, offset } = pagination.getPagination(parseInt(page), parseInt(size));
    const data = await questions.findAndCountAll({
      offset: offset,
      limit: limit,
      include: {
        model: answers
      }
    })
    const allQuestions = pagination.getPagingData(data, page, limit);
    if (!allQuestions) {
      res.status(404).json(response('Can not get all question!'));
    }
    res.status(200).json(response('Get data Successfully!',allQuestions));
  } catch (error) {
    res.status(500).json(error);
  }
}

//DELETE questions

module.exports = {
  getAllUser,
  deleteUserById,
  addQuestion,
  addAnswer,
  createQuestion,
  getAllQuestionsByAdmin
};
