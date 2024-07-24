const { placeShecma } = require('../schemas/places');
const { reviewShecma } = require('../schemas/review');
const ExpressHandler = require('../utils/ExpressError');

module.exports.validatePlace = (req, res, next) => {
    const { error } = placeShecma.validate(req.body);

    if(error){
        const msg = error.details.map(el => el.message).join(',');
        return next(new ExpressHandler(msg, 400))
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewShecma.validate(req.body);

    if(error){
        const msg = error.details.map(el => el.message).join(',');
        return next(new ExpressHandler(msg, 400))
    } else {
        next();
    }
}