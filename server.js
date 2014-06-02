'use strict';

var express = require('express'),
		pg = require('pg');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');
pg.defaults.user = (config.postgres.user);
pg.defaults.password = (config.postgres.password);
pg.defaults.host = (config.postgres.host);
pg.defaults.port = (config.postgres.port);
pg.defaults.database = (config.postgres.database);

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
