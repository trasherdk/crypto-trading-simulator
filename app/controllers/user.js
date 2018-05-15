const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.index = function (req, res){
    User.findById(req.session.id, function (err, userFound) {
        let user = { user : userFound };
        res.render('user', user);
    });
};

exports.update = function (req, res) {
    User.findByIdAndUpdate(req.session.id, req.body.update, function () {
        res.send('user updated');
    });
};

exports.drop = function (req, res) {

    User.findByIdAndRemove(req.session.id, function () {
        res.send('user deleted');
    });
};