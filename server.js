'use strict';

/*
 * nodejs-express-mongoose
 * Copyright(c) 2015 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('dotenv').config();

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const passport = require('passport');
const session = require('express-session');
const config = require('./config');

const models = join(__dirname, 'app/models');
const port = process.env.PORT || config.port || 3009;
const host = process.env.HOST || config.host || '0.0.0.0';

const app = express();
const connection = connect();

connection
  .on('error', console.error.bind(console, 'connection error:'))
  .on('disconnected', connect)
  .once('open', listen);



// Bootstrap models
fs
  .readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

//console.log(connection);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port, host);
  console.log('Express app started on %s:%s ', host, port);
}

function connect () {
  const options = {
  	keepAlive: 1,
  	useNewUrlParser: true
  };

  console.log("connect()", options, config);

  mongoose.connect(config.db, options, function(error){

    if ( error !== null)
  	  console.log("Connect Error", error);

  });

  return mongoose.connection;
}

/**
 * Expose
 */

module.exports = {
  app,
  connection
};
