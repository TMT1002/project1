const client = require("../connection");
const queries = require("../queries");

const getAllUser = (req,res) => {
    client.query(queries.getAllUser,(err,results)=>{
        if(err) throw err;
        res.status(200).json(results.rows);
    })
}

const getUserByAccount = (req,res) => {
    client.query(queries.getUserByAccount,[req.params.account],(err,results)=>{
        if(err) throw err;
        if(!results.rows.length){
            res.status(404).json("Not found user!");
        }
        else{
            res.status(200).json(results.rows);
        }
        
    })
}

const deleteUser = async (req,res) => {
    try {
        const deleteUser = await client.query(queries.deleteUserById,[req.params.id],(err,results)=>{
            if(err) throw err;
            res.status(200).json("DELETE successfully!!!");
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {getAllUser,getUserByAccount,deleteUser};