const client = require("../connection");
const queries = require("../queries");


const getAllQuestions = (req,res) => {
    client.query(queries.getAllQuestions,(err,results) =>{
        if(err) throw err;
        res.send(results.rows);
    })
}

const getQuestionById = async (req,res) => {
    var question;
    const awaitQuestion = await client.query(queries.getQuestionById,[req.params.id],(err,results) =>{
        if(err) throw err;
        console.log(results.rows);
    })
    console.log(question);
    client.query(queries.getAnswer,[req.params.id],(err,answer) =>{
        if(err) throw err;
        answer = answer.rows
    })
    res.status(200).json(question);
}

const getAllAnswer = (req,res) => {
    client.query(queries.getAllAnswer,(err,results)=>{
        if(err) throw err;
        res.send(results.rows);
    })
}

module.exports = {getAllQuestions,getQuestionById,getAllAnswer};
