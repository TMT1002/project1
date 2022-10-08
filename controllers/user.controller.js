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

//Create answer
const submit = async (req,res) => {
  try {
    const {userId,answerQuestions} = req.body;
    const result = await Promise.all(answerQuestions.map(async (answer) => {
      return new Promise(async(resolve,reject) => {
        const correctAnswers = await answers.findAll({where: {question_id:answer.question_id,correct:true}});
        const correctChoices = correctAnswers.map(value => value.answer_id).sort();
        let check = (correctChoices.length == answer.choices.length) && (answer.choices.sort().every((value,index) => value === correctChoices[index]))  
        const newData = await data.create({
          user_id: userId,
          question_id: answer.question_id,
          user_choice: JSON.stringify(answer.choices),
          correct_answer: JSON.stringify(correctChoices),
          correct: check
        });
        return resolve(newData);
      })
    }))
    return result;
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}



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


module.exports = {getAllQuestion,getResult,submit};

