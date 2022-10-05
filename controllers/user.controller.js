const {questions,answers} = require("../models")

const getAllQuestion = async(req,res) => {
    try {
        const allQuestions = await questions.findAll({include: answers});
        if(!allQuestions){
            res.status(404).json("Can not get all question!");
        }
        res.status(200).json(allQuestions);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {getAllQuestion};