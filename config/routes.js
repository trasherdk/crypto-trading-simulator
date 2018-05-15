'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');
const market = require('../app/controllers/market');
const wallet = require('../app/controllers/wallet');
const signUp = require('../app/controllers/signUp');
const login = require('../app/controllers/login');
const profile = require('../app/controllers/profile');
const historic = require('../app/controllers/historic');


/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/', home.index);
  app.get('/market', market.index);
  app.get('/wallet', wallet.index);
  app.get('/historic', historic.index);
  app.get('/login', login.index);
  app.get('/profile', profile.index);
  app.get('/sign-up', signUp.index);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
