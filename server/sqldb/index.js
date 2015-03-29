/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');

var Sequelize = require('sequelize');

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, config.sequelize.options)
};

// Insert models below

db.User = db.sequelize.import(path.join(
  config.root,
  'server',
  'api',
  'user',
  'user.model'
));

module.exports = db;
