const {questions,answers} = require("../models")

const getAllQuestion = async(req,res) => {
    try {
        const allQuestions = await questions.findAll({ include: answers});
        console.log(allQuestions);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {getAllQuestion};