'use strict';

var _ = require('lodash');
var query = require('pg-query');
var util = require('util');

// Get number of measurement records
exports.index = function(req, res) {
  query.first('SELECT count(*) FROM data_value', function (err, result) {
    if(!err){
      res.json(
        result
      );
    } else {
      res.status(503).send(
        err
      );
    }
  });
};

exports.hourlyAvgForDay = function(req, res) {  
  req.checkQuery('day', 'Invalid date!').isDate();
  req.checkQuery('sensorid', 'Invalid SensorID!').isInt();
  
  var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
  }
  
  var sensid = req.query.sensorid;
  var day = req.query.day;
  query("SELECT date_trunc('hour', \"timestamp\") as tick, avg(value) as value FROM data_value WHERE \"timestamp\" BETWEEN $2::date AND $2::date + time '23:59:59' AND sensor_id = $1::int GROUP BY 1 ORDER BY 1 ASC", [sensid, day], function (err, rows, result) {
    //checks errors in the connection to the db
    if(!err){
        res.json(
            rows
        );
    } else {
        res.status(503).send(
            err
        );
    }
  });
};