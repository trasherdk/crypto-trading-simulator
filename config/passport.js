'use strict';

/*
 * Module dependencies.
 */

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const local = require('./passport/local');

const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = function (passport) {

  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

  // use these strategies
  passport.use(local);
};
