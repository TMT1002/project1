const Joi = require('joi'); 

const addAns = Joi.object().keys({ 
    question_id: Joi.number().integer().required(),
    answer_id : Joi.number().integer().required(),
    content : Joi.string().required(),
    correct : Joi.boolean().required()
});

const addQuestions = Joi.object().keys({ 
    content : Joi.string().required(),
    answer : Joi.array().items(
        Joi.object().keys({
            answer_id : Joi.number().integer().required(),
            content : Joi.string().required(),
            correct : Joi.boolean().required()
        })
    )
});

const updateUser = Joi.object().keys({ 
    first_name : Joi.string(),
    last_name : Joi.string(),
    email : Joi.string(),
});

module.exports = {addAns,addQuestions,updateUser};
