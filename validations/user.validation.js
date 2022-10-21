const Joi = require('joi'); 

const addAns = Joi.object().keys({ 
    question_id: Joi.number().integer().required(),
    answer_id : Joi.number().integer().required(),
    content : Joi.string().required(),
    correct : Joi.boolean().required()
});

const addQuestions = Joi.object().keys({ 
    content : Joi.string().required(),
    image: Joi.string(),
    answer : Joi.array().items(
        Joi.object().keys({
            answer_id : Joi.number().integer().required(),
            content : Joi.string().required(),
            correct : Joi.boolean().required(),
            image: Joi.string()
        })
    )
});

const updateUser = Joi.object().keys({ 
    first_name : Joi.string().optional(),
    last_name : Joi.string().optional(),
    email : Joi.string().optional(),
    avatar: Joi.string().optional()
});

const getAllQuestions = Joi.object().keys({
    query: Joi.object().keys({
        page: Joi.number().integer(),
        size: Joi.number().integer()
    }),
});


module.exports = {addAns,addQuestions,updateUser,getAllQuestions};
