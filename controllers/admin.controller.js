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

//DELETE questions
const deteleQuestionById = async (req, res) => {
  try {
    const findQuestionById = await questions.findOne({where: {id: [req.params.id]}});
    if(!findQuestionById)
    return res.status(404).json(response('Not found question!'));
    const deleteQuestion = await questions.destroy({where: {id: [req.params.id]}});
    if(!deleteQuestion)
    return res.status(404).json(response('You can not delete question!'));
    res.status(200).json(response('Deleted Successfully!'));
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllUser,
  deleteUserById,
  addQuestion,
  addAnswer,
  createQuestion,
  deteleQuestionById
};
