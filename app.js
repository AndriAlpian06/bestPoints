const express = require('express');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError')

const app = express();


// connect database mongodb
mongoose.connect('mongodb://127.0.0.1/bestPoints')
    .then((result) => {
        console.log('connected to mongodb')
    })
    .catch((err) => {
        console.log('Gagal connect to mongodb', err)
    })

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// add middleware
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'this-is-a-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        express: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})

// app.get('/register', async(req, res) => {
//     const user = new User({
//         email: 'user1@email.com',
//         username: 'user2'
//     })

//     const newUser = await User.register(user, 'password')
//     res.send(newUser)
// })

app.use('/', require('./routes/auth'))
app.use('/places/', require('./routes/places'))
app.use('/places/:place_id/reviews', require('./routes/reviews'))


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode  = 500 } = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log(`Server is running on http://127.0.0.1:3000`);
})