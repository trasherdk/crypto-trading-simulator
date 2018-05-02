const mongoose = require('mongoose');

const Wallet = mongoose.model('Wallet');
const User = mongoose.model('User');

exports.index = (req, res) => {
    User.findById(req.session.id, function (err, user) {
        let wallet = user.wallet;
        res.render('wallet')
    });
};
