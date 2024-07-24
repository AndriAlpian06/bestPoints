const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const isValidObject = require('../middlewares/isValidObject');
const isAuth = require('../middlewares/isAuth');
const { validatePlace } = require('../middlewares/validator')

// controller
const PlaceController = require('../controllers/place')

// shcema
const { isAuthorPlace } = require('../middlewares/isAuthor');
const upload = require('../config/multer');

const router = express.Router();

router.route('/')
    .get(wrapAsync(PlaceController.index))
    //.post(isAuth, validatePlace,wrapAsync(PlaceController.store))
    .post(isAuth, upload.array('image', 5), (req, res) => {
        console.log(req.files);
        console.log(req.body);
        res.send('it works');
    })
router.get('/create', isAuth, async(req, res) => {
    res.render('places/create')
})


router.route('/:id')
    .get(isValidObject('/places'), wrapAsync(PlaceController.show))
    .put(isAuth, isAuthorPlace, isValidObject('/places'), validatePlace, wrapAsync(PlaceController.update))
    .delete(isAuth, isAuthorPlace, isValidObject('/places'), wrapAsync(PlaceController.destroy))

router.get('/:id/edit', isAuth, isAuthorPlace, isValidObject('/places'), wrapAsync(PlaceController.edit))

module.exports = router