const joi = require('joi');

const registerUserValidation = joi.object({
    name: joi.string().required().max(75),
    email: joi.string().required(),
    password: joi.required(),
});

const loginUserValidation = joi.object({
    name: joi.string().max(75),
    email: joi.string().required(),
    password: joi.required(),
});

exports.registerUserValidation = registerUserValidation;
exports.loginUserValidation = loginUserValidation;


