const bcrypt = require("bcrypt");
const {users} = require("../models")

const registerUser = async(req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashed
        const newUser = await users.create({...req.body});
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginUser = async(req,res) => {
    try {
        const user = await users.findOne({where:{account: req.body.account}});
        if(!user){
            res.status(404).json("Wrong account!");
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword){
            res.status(404).json("Wrong password!")
        }
        if(user && validPassword){
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {registerUser,loginUser};