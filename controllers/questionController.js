const client = require("../config/connection");
const queries = require("../config/queries");


const getAllQuestions = async (req,res) => {
    try {
        client.query(queries.getAllQuestions,(err,results) =>{
            if(err) throw err;
            res.send(results.rows);
        })
    } catch (error) {
        res.status(500).json(err);
    }
}

const getQuestionById = async (req,res) => {
    try {
        client.query(queries.getAnswer,[req.params.id],(err,answer) =>{
            if(err) throw err;
            res.status(200).json(answer.rows);
        })
    } catch (error) {
        res.status(500).json(err);
    }
    
}

const getAllAnswer = async (req,res) => {
    try {
        client.query(queries.getAllAnswer,(err,results)=>{
            if(err) throw err;
            res.send(results.rows);
        })
    } catch (error) {
        res.status(500).json(err);
    }
}

module.exports = {getAllQuestions,getQuestionById,getAllAnswer};
