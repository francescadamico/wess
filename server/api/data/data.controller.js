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
  req.checkQuery('station', 'Invalid station!').isInt();
  req.checkQuery('height', 'Invalid sensor height!').isInt();
  req.checkQuery('measuredescr', 'Invalid measurement description!').isAlpha;
  req.checkQuery('senstypedescr', 'Invalid sensor type description!').isAlpha();
  
  var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
  }
  
    var day = req.query.day;
    var station = req.query.station;
    var height = req.query.height;
    var measdescr = req.query.measuredescr;
    var senstypedescr = req.query.senstypedescr;
    
  query("SELECT date_trunc('hour', data_value.timestamp) as tick, avg(data_value.value) as value \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp \
AND $1::timestamp + time '23:59:59' AND sensor.station_id = $2::int \
AND sensor.height = $3::int \
AND sensor_type.description = $4::text \
AND measurement_description.type = $5::text \
GROUP BY 1 ORDER BY 1 ASC", [day, station, height, senstypedescr, measdescr], function (err, rows, result) {
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