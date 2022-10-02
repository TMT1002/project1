const client = require("../connection");
const queries = require("../queries");


const getAllQuestions = (req,res) => {
    client.query(queries.getAllQuestions,(err,results) =>{
        if(err) throw err;
        res.send(results.rows);
    })
}

const getQuestionById = (req,res) => {
    client.query(queries.getQuestionById,[req.params.id],(err,results) =>{
        if(err) throw err;
        res.send(results.rows);
    })
}

module.exports = {getAllQuestions,getQuestionById};
