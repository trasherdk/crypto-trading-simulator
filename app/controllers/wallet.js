const mongoose = require('mongoose');

const Wallet = mongoose.model('Wallet');
const User = mongoose.model('User');
const Trading = mongoose.model('Trading');

exports.index = (req, res) => {
  Wallet.findById(req.session.walletId, function (err, wallet) {
    console.log(wallet);
    console.log(err);
    console.log(req.session);

    User.findById(req.session.id).populate({
          path: 'trading',
          model : Trading
    }).exec(function (err, user){
        const isConnected = typeof req.session.id !== 'undefined';
        res.render('wallet', { wallet, trading:user.trading, isConnected });
    });
  });
};

exports.update = (req, res) => {
  Wallet.findById(req.session.walletId, req.body.update, function () {
    res.send('wallet updated');
  });
};

exports.drop = function (req, res) {
  Wallet.findByIdAndRemove(req.body.id, function () {
    res.send('wallet deleted');
  });
};

const fillWallet = function (req, res) {
    // TODO changer nom variable selon champs
    // si c'est un ajout en euros
    let moneyToAdd = req.body.add;
    Wallet.findById(req.session.walletId, { $inc : { 'currency_qty' : moneyToAdd } }, function () {
        res.redirect('/wallet');
    });
};
exports.fillWallet = fillWallet;


const withdrawWallet = function (req, res) {
    // TODO changer nom variable selon champs
    let moneyToWithdraw = req.body.withdraw;
    Wallet.findById(req.session.walletId, { $inc : { 'currency_qty' : moneyToWithdraw } }, function () {
        res.redirect('/wallet');
    });
};
exports.withdrawWallet = withdrawWallet;