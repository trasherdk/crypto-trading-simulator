const mongoose = require("mongoose");
const moment = require('moment');
moment.locales('fr');

// Date pour mise a jour dans le wallet
const data = [];
const time = moment().format('Do MMMM YYYY à h:mm');
data.push({
  time
});

const Wallet = mongoose.model("Wallet");
const User = mongoose.model("User");

exports.index = (req, res) => {
  User.findById(req.session.id, function(err, user) {
    let wallet = { wallet: user.wallet };
    const isConnected = typeof req.session.id !== "undefined";
    res.render("wallet", { wallet, isConnected, data });
  });
};

exports.update = (req, res) => {
  Wallet.findById(req.session.walletId, req.body.update, function() {
    res.send("wallet updated");
  });
};

exports.drop = function(req, res) {
  Wallet.findByIdAndRemove(req.body.id, function() {
    res.send("wallet deleted");
  });
};
