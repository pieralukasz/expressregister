module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'Please log in')
        res.redirect('/users/login');
    },

    youAreNotLog: function (req, res, next) {
        if (req.isAuthenticated()) {
            req.flash('success', 'You are already log in')
            res.redirect('/dashboard');
        }
        res.redirect('/users/login');

    }


}