const Joi = require('joi'); 

const register = Joi.object().keys({ 
    first_name: Joi.string().min(1).max(20).required(),
    last_name: Joi.string().min(1).max(20).required(),
    email: Joi.string().min(5).max(50).required(),
    account: Joi.string().min(5).max(50).required(),
    password: Joi.string().required()
});

const login = Joi.object().keys({ 
    account: Joi.string().min(5).max(50).required(),
    password: Joi.string().required()
});

module.exports = {register,login};

