module.exports = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error_msg', 'Kamu belum login');
        return res.redirect('/login')
    }

    next();
}