const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.index = function (req, res){
    User.findById(req.session.id, function (err, user) {

        res.send(user);
    });
};

exports.edit = function (req, res) {

    User.findById(req.session.id, req.update, function () {
        res.send('user updated');
    });
};