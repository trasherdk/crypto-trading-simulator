const mongoose = require('mongoose');

const Wallet = mongoose.model('Wallet');
const User = mongoose.model('User');
const Trading = mongoose.model('Trading');

exports.index = (req, res) => {
  Wallet.findById(req.session.walletId, function (err, wallet) {
    User.findById(req.session.id).populate({
          path: 'trading',
          model : Trading
    }).exec(function (err, user){
        const isConnected = typeof req.session.id !== 'undefined';
        res.render('wallet', { wallet, trading:user.trading, isConnected, csrfToken: req.csrfToken() });
    });
  });
};

exports.update = (req, res) => {
    let money = (req.body.moneyAdd) ? req.body.moneyAdd : - req.body.moneyWithdraw;
    Wallet.findByIdAndUpdate(req.session.walletId, { $inc : { 'currency_qty' : money } }).exec();
    res.redirect('/wallet');
};

exports.drop = function (req, res) {
  Wallet.findByIdAndRemove(req.body.id, function () {
    res.send('wallet deleted');
  });
};