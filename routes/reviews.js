const express = require('express')
const wrapAsync = require('../utils/wrapAsync');
const isValidObject = require('../middlewares/isValidObject');
const isAuth = require('../middlewares/isAuth');
const { validateReview } = require('../middlewares/validator')

// import controller review
const ReviewController = require('../controllers/review')

// schema place
const { isAuthorReview } = require('../middlewares/isAuthor');

const router = express.Router({ mergeParams: true });

router.post('/', isAuth, isValidObject('/places'), validateReview, wrapAsync(ReviewController.store))

router.delete('/:review_id', isAuth, isAuthorReview, isValidObject('/places'), wrapAsync(ReviewController.destroy))

module.exports = router;