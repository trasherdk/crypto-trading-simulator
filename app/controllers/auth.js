const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const Wallet = mongoose.model('Wallet');



// Restrict access to root page
exports.home = function (req, res) {
    res.render('index', { user : req.user });
};

// Go to registration page
exports.signup = function (req, res) {
    res.render('signUp', { csrfToken: req.csrfToken() });
};

// Post registration
exports.doRegister = function (req, res) {
    console.log(req.body);
    let data = req.body;
    if (data.pseudo === '' || data.mail === '' || data.pass === '' || data.passConfirm === '') {
        return res.render('signUp', { err: 'Veuillez compléter tous les champs', csrfToken: req.csrfToken() });
    }
    if (data.pass !== data.passConfirm) {
        return res.render('signUp', { err: 'Pas le même mot de passe', csrfToken: req.csrfToken() });
    }
    User.register(new User({ username: data.pseudo, email:data.mail, hashed_password:data.pass, name:data.pseudo }), data.pass, function (err, user) {
        if (err) {
            return res.render('signUp', { csrfToken: req.csrfToken(), err : 'Compte déjà existant' });
        }
        let wallet = new Wallet({
            currency: 'euros',
            currency_qty: 0
        });
        wallet.save();
        User.findByIdAndUpdate(user._id, { $set: { wallet: wallet } }).exec();
        doLogin(req, res);
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
        req.session.id = user._id;
        req.session.walletId = user.walletId;
        res.redirect('/profile');

    });
    // passport.authenticate('local')(req, res, function (req, res) {
    //     console.log('ok3');
    //     User.findOne({ 'name': req.body.name }, function (err, user) {
    //         console.log('ok4');
    //         req.session.id = user._id;
    //         req.session.walletId = user.walletId;
    //     });
    //     res.redirect('/');
    // });
};
exports.doLogin = doLogin;

// logout
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};