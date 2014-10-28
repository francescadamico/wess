'use strict';

var _ = require('lodash');
var query = require('pg-query');

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
  var sensid = req.query.sensorid;
  var day = req.query.day;
  query("SELECT date_trunc('hour', \"timestamp\") as tick, avg(value) as value FROM data_value WHERE \"timestamp\" BETWEEN $2::timestamp AND $2::timestamp + time '23:59:59' AND sensor_id = $1::int GROUP BY 1 ORDER BY 1 ASC", [sensid, day], function (err, rows, result) {
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

exports.hourlyAvgForDay3Sites = function(req, res) {
    var day = req.query.day;
    var station = req.query.station;
    var height = req.query.height;
    var senstype = req.query.sensortype;
    var measdescr = req.query.measuredescr;
    
    /* the query can be a sum of queries, use „UNION“ and for every column that  is missed in one query but needed in another query add in the SELECT part: „null as <missed_column_name>“
    */
    query("SELECT date_trunc('hour', data_value.timestamp) as tick, avg(data_value.value) as value1, null::numeric as value2, null::numeric as value3 FROM data_value, sensor WHERE data_value.sensor_id = sensor.sensor_id AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' AND sensor.station_id = $2::int AND sensor.height = $3::int AND sensor.sensor_type_id = $4::int AND data_value.measurement_description_id = $5::int GROUP BY 1 UNION SELECT date_trunc('hour', data_value.timestamp) as tick, null::numeric as value1, avg(data_value.value) as value2, null::numeric as value3 FROM data_value, sensor WHERE data_value.sensor_id = sensor.sensor_id AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' AND sensor.station_id = $6::int AND sensor.height = $3::int AND sensor.sensor_type_id = $4::int AND data_value.measurement_description_id = $5::int GROUP BY 1 UNION SELECT date_trunc('hour', data_value.timestamp) as tick, null::numeric as value1, null::numeric as value2, avg(data_value.value) as value3 FROM data_value, sensor WHERE data_value.sensor_id = sensor.sensor_id AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' AND sensor.station_id = $7::int AND sensor.height = $3::int AND sensor.sensor_type_id = $4::int AND data_value.measurement_description_id = $5::int GROUP BY 1 ORDER BY 1 ASC", [day, station[0], height, senstype, measdescr, station[1], station[2]], function (err, rows, result){
         //checks errors in the connection to the db
         if(!err){
             res.json(rows);
         } else {
            res.status(503).send(err);
         }
     });
 }; 