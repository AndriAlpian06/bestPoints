const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    res.render('auth/register')
}

module.exports.register = async(req, res) => {
    try{
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registerUser = await User.register(user, password)
        req.login(registerUser, (err) => {
            if(err) return next(err);
            req.flash('success_msg', 'Kamu berhasil registrasi dan bisa login')
            res.redirect('/places')
        })
        
    } catch (err){
        req.flash('error_msg', err.message)
        res.redirect('/register')
    }
}

module.exports.loginForm = (req, res) => {
    res.render('auth/login')
}

module.exports.login = (req, res) => {
    req.flash('success_msg', 'Kamu berhasil login')
    res.redirect('/places/landing');
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if(err) { return next(err) }
        req.flash('success_msg', 'Kamu berhasil logout');
        res.redirect('/login')
    })
}