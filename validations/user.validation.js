const Joi = require('joi'); 

const addAns = Joi.object().keys({ 
    question_id: Joi.number().integer().required(),
    answer_id : Joi.number().integer().required(),
    content : Joi.string().required(),
    correct : Joi.boolean().required()
});

module.exports = {addAns};
