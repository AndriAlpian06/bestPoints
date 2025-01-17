const Joi = require('joi');

module.exports.placeShecma = Joi.object({
    place: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().required(),
        location: Joi.string().required()
    }).required()
})