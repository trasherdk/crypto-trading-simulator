const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const User = mongoose.model('User');

exports.index = function (req, res) {
  User.findById(req.session.id, function (err, user) {
      const isConnected = typeof req.session.id !== 'undefined';
      res.render('profile', { user, isConnected, csrfToken: req.csrfToken() });
  });
};

exports.update = function (req, res) {
  const isConnected = typeof req.session.id !== 'undefined';
  const update = {};
  let changePass = false;
  if (req.body.mail !== '') update.email = req.body.mail;
  if (req.body.pseudo !== '') update.username = req.body.pseudo;
  if (req.body.pass !== '' && req.body.passConfirm !== ''){
    if (req.body.pass === req.body.passConfirm) changePass = true;
  }
  if (update !== {}) {
      User.findByIdAndUpdate(req.session.id, { $set : update }, function (err, user) {
          if (changePass) {
            user.changePassword(req.body.lastPass, req.body.pass);
            user.save();
          }
          res.render('profile', { user:update, isConnected, csrfToken: req.csrfToken() });
      });
  }
  else {
      User.findById(req.session.id, function (err, user) {
          res.render('profile', { user, isConnected, csrfToken: req.csrfToken() });
      });
  }
};

exports.drop = function (req, res) {
  User.findByIdAndRemove(req.session.id, function () {
    res.redirect('/');
  });
};
