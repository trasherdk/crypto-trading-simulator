const mongoose = require('mongoose');

const User = mongoose.model('User');
const Trading = mongoose.model('Trading');

exports.index = (req, res) => {
    User.findById(req.session.id).populate({
        path: 'trading',
        model : Trading
    }).exec(function (err, user){
        const isConnected = typeof req.session.id !== 'undefined';
        res.render('historic', {  trading:user.trading, isConnected });
    });
};