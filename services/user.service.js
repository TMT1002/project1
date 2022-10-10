const { questions, answers, results, data, session} = require('../models');

// get user choice, correct answer, is correct
const getResultAnswersInSession = async (req,session) => {
    const results = await data.findAll({
        attributes: ["question_id","user_choice","answer_correct","correct"],
        where: {
          session: session, user_id: req.user.id
        }
    });
    return results
}
// get content question and answers for question by question id
const getDataQuestions = async (getResultAnswersInSession) => {
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
}

//get all questions 
const getAllQuestion = async () => {

}

  module.exports = {getResultAnswersInSession,getDataQuestions,getAllQuestion};