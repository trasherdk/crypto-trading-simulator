const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const passport = require('passport');
const User = mongoose.model('User');
const Wallet = mongoose.model('Wallet');



// Restrict access to root page
exports.home = function (req, res) {
    res.render('index', { user : req.user });
};

// Go to registration page
exports.signup = function (req, res) {
    res.render('sign-up', { csrfToken: req.csrfToken() });
};

// Post registration
exports.doRegister = function (req, res) {
    let data = req.body;
    if (data.pseudo === '' || data.mail === '' || data.pass === '' || data.passConfirm === '') {
        return res.render('sign-up', { err: 'Please complete all fields', csrfToken: req.csrfToken() });
    }
    if (data.pass !== data.passConfirm) {
        return res.render('sign-up', { err: 'Passwords does not match.', csrfToken: req.csrfToken() });
    }

    User.register(new User({ email:data.mail, username:data.pseudo }), data.pass, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('sign-up', { csrfToken: req.csrfToken(), err : 'Existing account' });
        }
        let wallet = new Wallet({
            currency: 'euros',
            currency_qty: 0
        });
        wallet.save();
        User.findByIdAndUpdate(user._id, { $set: { wallet: wallet } }).exec();

        return res.redirect('login');
    });
};

// Go to login page
exports.login = function (req, res) {
    res.render('login', { csrfToken: req.csrfToken() });
};

// Post login
const doLogin = function (req, res) {
    let authenticate = User.authenticate();
    authenticate(req.body.pseudo, req.body.pass, function (err, user) {
        if (user){
            req.session.id = user._id;
            req.session.walletId = user.wallet;
            return res.redirect('/market');
        }
        else {
            return res.redirect('/login');
        }
    });
};
exports.doLogin = doLogin;

// logout
exports.logout = function (req, res) {
    req.logout();
    req.session = null;
    res.redirect('/login');
};