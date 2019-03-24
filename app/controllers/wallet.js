const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

const Wallet = mongoose.model("Wallet");
const User = mongoose.model("User");
const Trading = mongoose.model("Trading");

const compare = (a, b) => {
  const dateA = a.date;
  const dateB = b.date;

  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison * -1;
};

exports.index = (req, res) => {
  Wallet.findById(req.session.walletId, function(err, wallet) {
    User.findById(req.session.id)
      .populate({
        path: "trading",
        model: Trading
      })
      .exec(function(err, user) {
        const isConnected = typeof req.session.id !== "undefined";
        wallet.currency_qty = wallet.currency_qty.toFixed(2);
        res.render("wallet", {
          wallet,
          trading: user.trading.sort(compare),
          isConnected,
          csrfToken: req.csrfToken()
        });
      });
  });
};

exports.update = (req, res) => {
  let money = req.body.moneyAdd ? req.body.moneyAdd : -req.body.moneyWithdraw;
  money = money.toFixed(2)
  // Wallet.findByIdAndUpdate(req.session.walletId, { $inc : { 'currency_qty' : money } }).exec();
  Wallet.findById(req.session.walletId, function(err, wallet) {
    if (req.body.moneyWithdraw) {
      if (wallet.currency_qty < req.body.moneyWithdraw)
        return res.redirect("/wallet");
    }
    wallet.update({ $inc: { currency_qty: money } }).exec();
    return res.redirect("/wallet");
  });
};

exports.drop = function(req, res) {
  Wallet.findByIdAndRemove(req.body.id, function() {
    res.send("wallet deleted");
  });
};
