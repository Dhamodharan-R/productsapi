const joi = require("joi");

const schema = {
    registerSchema: joi.object({
        name:joi.string().required() ,
        email:joi.string().email().required() ,
        password:joi.string().min(4).max(20).required() 
    }),
    loginSchema:joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).max(20).required()
    }),
    cementsSchema:joi.object({
        name:joi.string().required(),
        price:joi.number()
    })
}

module.exports = schema;