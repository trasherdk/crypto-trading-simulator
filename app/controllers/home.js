/* !
 * Module dependencies.
 */

exports.index = function(req, res) {
  const isConnected = typeof req.session.id !== "undefined";

  res.render("home", { isConnected });
};

// TEST MONGOOSE (laisser en commentaire SVP)
//
// const mongoose = require('mongoose');
//
// const Trading = mongoose.model('Trading');
// const User = mongoose.model('User');
// const Wallet = mongoose.model('Wallet');
//
//
// User.findById('5ae97ab64e39f2434c11329e', function (err, user) {
//     console.log(user);
// });

// let trade = new Trading({
//     src_currency:'euros',
//     src_value:10,
//     dst_currency:'euros',
//     dst_value:20
// });
// trade.save();
//
// let wallet = new Wallet({
//     currency: 'euros',
//     currency_qty: 0
// });
// wallet.save();
//
// let user = new User({
//     name: 'nathan',
//     email: 'nathan@mail.com',
//     hashed_password: 'e',
//     salt: 'e',
//     wallet: wallet
// });
// user.save();
//
