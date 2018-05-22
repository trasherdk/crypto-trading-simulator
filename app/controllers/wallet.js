const mongoose = require("mongoose");

const Wallet = mongoose.model("Wallet");
const User = mongoose.model("User");

exports.index = (req, res) => {
  User.findById(req.session.id, function(err, user) {
    let wallet = { wallet: user.wallet };
    const isConnected = typeof req.session.id !== "undefined";
    res.render("wallet", { wallet, isConnected });
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
