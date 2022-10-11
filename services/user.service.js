const { questions, answers, results, data, session} = require('../models');

// get user choice, correct answer, is correct
const getResultAnswersInSession = async (req,session) => {
  try {
    const results = await data.findAll({
      attributes: ["question_id","user_choice","answer_correct","correct"],
      where: {
        session: session, user_id: req.user.id
      }
    });
  return results
  } catch (error) {
    res.status(500).json(error);
  }
}
// get content question and answers for question by question id
const getDataQuestions = async (getResultAnswersInSession) => {
  try {
    return await Promise.all(getResultAnswersInSession.map(async (value)=> {
      return new Promise(async(resolve,reject) => {
        let resultAnswer = value.dataValues;
        const getQuestions = await questions.findAll({
          where: {
            id: resultAnswer.question_id
          }
        });
        const getAnswer = await answers.findAll({
          order: [["answer_id","ASC"]],
          where: {
            question_id : resultAnswer.question_id
          }
        })
        const contentAnswer = getAnswer.map((currentValue) => currentValue.content)
        const contentQuestion = getQuestions.map((currentValue) => currentValue.content);
        resultAnswer.contentQuestion = contentQuestion[0];
        resultAnswer.contentAnswer = contentAnswer;
        resolve(resultAnswer);
      })
    }));
  } catch (error) {
    res.status(500).json(error)
  }
}

const createQuestion = async (req,answer) => {
  try {
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
    return newQuestion;
  } catch (error) {
    res.status(500).json(error);
  }
}

const getAllResultById = async (req) => {
  try {
    const getAllResultById = await results.findAll({
      attributes: ["session","score"],
      where: {
        user_id: req.user.id
      }
    });
    return getAllResultById
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {getResultAnswersInSession,getDataQuestions,createQuestion,getAllResultById};