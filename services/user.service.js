const { questions, answers, results, data, session} = require('../models');


const getResultAnswersInSession = async (req,session) => {
    const results = await data.findAll({
        attributes: ["question_id","user_choice","answer_correct","correct"],
        where: {
          session: session, user_id: req.user.id
        }
    });
    return results
}
// lấy data các câu hỏi, user choice, correct answer
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

  module.exports = {getResultAnswersInSession,getDataQuestions};