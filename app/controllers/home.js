
/* !
 * Module dependencies.
 */

exports.index = function (req, res) {
  res.render('home/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};

//
// const mongoose = require('mongoose');
//
// const Crypto = mongoose.model('Crypto');
//
// let cryp = new Crypto({ currency:'BTC', euro_value:1 });
//
// cryp.save(function (err) {
//     if (err) console.error(err);
//     // saved!
// });
