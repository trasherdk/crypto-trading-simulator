const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

// Restrict access to root page
exports.home = function (req, res) {
    res.render('index', { user : req.user });
};

// Go to registration page
exports.signup = function (req, res) {
    console.log(req.body);
    console.log(req.query);
    res.render('signUp');
};

// Post registration
exports.doRegister = function (req, res) {
    console.log('ok');
    if (req.body.pass !== req.body.passConfirm) res.render('signUp', { err:'Pas le même mot de passe' });
    User.register(new User({ name: req.body.pseudo }), req.body.pass, function (err, user) {
        if (err) {
            res.render('signUp');
        }

        doLogin(req, res);
    });
};

// Go to login page
exports.login = function (req, res) {
    res.render('login');
};

// Post login
const doLogin = function (req, res) {
    passport.authenticate('local')(req, res, function () {
        User.findOne({ 'name': req.body.name }, function (err, user) {
            req.session.id = user._id;
            req.session.walletId = user.walletId;
        });
        res.redirect('/');
    });
};
module.exports = { doLogin };

// logout
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};