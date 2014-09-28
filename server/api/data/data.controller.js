'use strict';

var _ = require('lodash');
var query = require('pg-query');

// Get number of measurement records
exports.index = function(req, res) {
  query.first('SELECT count(*) FROM data_val', function (err, result) {
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
  var sensid = req.query.sensorid;
  var day = req.query.day;
  query("SELECT date_trunc('hour', \"timestamp\") as tick, avg(value) as value FROM data_val WHERE \"timestamp\" BETWEEN $2::date AND $2::date + time '23:59:59' AND sensor = $1::int GROUP BY 1 ORDER BY 1 ASC", [sensid, day], function (err, rows, result) {
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