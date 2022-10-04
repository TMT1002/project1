const {users} = require("../models");
const { sync } = require("../models/results.model");

// GET All Users
const getAllUser = async(req,res) => {
    try {
        const allUser = await users.findAll();
        console.log(allUser);
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

//DELETE User by ID
const deleteUserById = async(req,res) => {
    try {
        const user = await users.destroy({ where: { id: [req.params.id] } });
        if(user){
            res.status(200).json(`Deleted account with id = ${req.params.id}`);
        }else{
            res.status(404).json(`Not found account with id = ${req.params.id}`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {getAllUser,deleteUserById};