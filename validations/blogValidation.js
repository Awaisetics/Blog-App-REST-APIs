const joi = require('joi');

const addBlogValidation = joi.object({
    title: joi.string().required().max(75),
    content: joi.string().required().max(9750),
    tags : joi.array(),
    authorDetail: joi.allow,
});  

const updateBlogValidation = joi.object({
    id: joi.required(),
    title: joi.string().max(75),
    tags: joi.array(),
    content: joi.string().max(9750),
});

exports.addBlogValidation = addBlogValidation;
exports.updateBlogValidation = updateBlogValidation;