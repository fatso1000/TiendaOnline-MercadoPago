const authCtrl = {};

const passport = require('passport');

// SIGNUP || REGISTRO
authCtrl.renderSignUp = (req, res) => {
    res.render('auth/signup');
};

authCtrl.signUp = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
});

// SINGIN || LOGIN

authCtrl.renderSignIn = (req, res, next) => {
    res.render('auth/signin');
};

authCtrl.signIn = passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
});

// LOGOUT || SALIRSE

authCtrl.logout = (req, res, next) => {
    req.logOut();
    req.session.destroy((err) => {
        res.redirect('/');
    });
};

module.exports = authCtrl;