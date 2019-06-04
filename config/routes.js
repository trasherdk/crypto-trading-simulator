'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');
const market = require('../app/controllers/market');
const wallet = require('../app/controllers/wallet');
const auth = require('../app/controllers/auth');
const profile = require('../app/controllers/profile');
const historic = require('../app/controllers/historic');
const user = require('../app/controllers/user');

/**
 * Expose
 */

module.exports = function (app, passport) {

  /* All routes that DON't require a valid login */
  app.get('/', home.index);
  app.get('/login', auth.login);
  app.post('/login', auth.doLogin);
  app.get('/sign-up', auth.signup);
  app.post('/sign-up', auth.doRegister);
  app.get('/market', market.index);

  /* Check if user is logged in */
  app.use('/', (req, res, next) => req.session.id ? next() : res.redirect('/login'));
  
  /* All routes that require a valid login */
  app.get('/logout', auth.logout);
  app.get('/market/:pair', market.pair);
  app.post('/market/:pair', market.trade);
  app.get('/wallet', wallet.index);
  app.post('/wallet', wallet.update);
  app.get('/historic', historic.index);
  app.get('/profile', user.index);
  app.post('/profile', user.update);

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
