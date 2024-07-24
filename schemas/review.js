const Joi = require('joi');

module.exports.reviewShecma = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        body: Joi.string().min(3).required()
    }).required()
})