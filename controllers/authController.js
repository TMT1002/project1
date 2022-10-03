const bcrypt = require("bcrypt");
const client = require("../connection");
const queries = require("../queries");
const jwt = require("jsonwebtoken");


const register = async (req,res) => {
    try {
        const {first_name,last_name,gmail,account,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password,salt);
        client.query(queries.checkEmailExists,[gmail],(err,results)=>{
            if(err) throw err;
            if(results.rows.length){
                res.send("Gmail already exists");
            }
            else{
                client.query(queries.checkAccountExists,[account],(err,results)=>{
                    if(err) throw err;
                    if(results.rows.length){
                        res.send("Account already exists");
                    }
                    else{
                        client.query(queries.addUser,[first_name,last_name,gmail,account,hashed],(err,results)=>{
                            if(err) throw err;
                            res.status(201).send("ADD User successfully!");
                        })
                    }
                })
            }
        })
       
    } catch (err) {
        res.status(500).json(err);
    }
}

const loginUsers = async(req,res) => {
    try {
        const {account,password} = req.body;
        client.query(queries.checkLogin,[account],(err,results) => {
            if(err) throw err;
            if(!results.rows.length){
                res.status(404).json("not found user!");
            }
            else{
                const validPass = bcrypt.compareSync(password,results.rows[0].password);
                // console.log(validPass);
                if(validPass){
                    client.query(queries.getUserByAccount,[account],(err,results) => {
                        if(err) throw err;
                        const accessToken = jwt.sign({
                            id: results.rows[0].user_id,
                            admin: results.rows[0].admin
                        },process.env.ACCESS_TOKEN,{expiresIn: "2h"})
                        const refreshToken = jwt.sign({
                            id: results.rows[0].user_id,
                            admin: results.rows[0].admin
                        },process.env.REFRESH_TOKEN,{expiresIn: "7d"})
                        const user = results.rows[0];
                        res.status(200).json({user,accessToken,refreshToken});
                        client.query(queries.saveToken,[user.user_id,accessToken,refreshToken],(err,results) => {
                            if(err) throw err;
                        })
                    })
                }
                else{
                    res.status(404).json("Password is wrong!");
                }
            }
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {register,loginUsers};