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

/* The stations are not given as a parameter since at the moment of writing there are only 
 * 3 different stations, so all of them are hardcoded in the query.
 * TODO: When the number of stations will increase it could be useful to pass an array or 
 * station1, station2, station3 to the function. 
 * Possible ISSUES: the array approach leads to a problem due to the fact that passing arrays as 
 * GET query parameter is not really standardized and so I don't know how to to the 
 * parameters validation. */
exports.hourlyAvgForDay3Sites = function(req, res) {
    req.checkQuery('day', 'Invalid date!').isDate();
   // req.checkQuery('height', 'Invalid sensor height!').isInt();
    req.checkQuery('measuredescr', 'Invalid measurement description!').isAlpha;
    req.checkQuery('senstypeid', 'Invalid sensor type description!').isInt();
  
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 400);
    }
    
    
    var day = req.query.day;
    //var height = req.query.height;
    var measdescr = req.query.measuredescr;
    var senstypeid = req.query.senstypeid;
    
    /* the query can be a sum of queries, use „UNION“ and for every column that  is missed in one query but needed in another query add in the SELECT part: „null as <missed_column_name>“
    */
    
    query("SELECT tick , sum(value1) as value1, sum(value2) as value2, sum(value3) as value3 \
          FROM ( \
SELECT date_trunc('hour', data_value.timestamp) as tick, avg(data_value.value) as value1, null::numeric as value2, null::numeric as value3 \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' \
AND sensor.station_id = 3 \
AND sensor_type.sensor_type_id = $2::int \
AND measurement_description.type = $3::text \
GROUP BY 1 \
UNION SELECT date_trunc('hour', data_value.timestamp) as tick, null::numeric as value1, avg(data_value.value) as value2, null::numeric as value3 \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' \
AND sensor.station_id = 1 \
AND sensor_type.sensor_type_id = $2::int \
AND measurement_description.type = $3::text \
GROUP BY 1 \
UNION SELECT date_trunc('hour', data_value.timestamp) as tick, null::numeric as value1, null::numeric as value2, avg(data_value.value) as value3 \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' \
AND sensor.station_id = 2 \
AND sensor_type.sensor_type_id = $2::int \
AND measurement_description.type = $3::text \
GROUP BY 1)t \
GROUP BY 1 ORDER BY 1 ASC", [day, senstypeid, measdescr], function (err, rows, result){
         //checks errors in the connection to the db
         if(!err){
             res.json(rows);
         } else {
            res.status(503).send(err);
         }
     });
 }; 


exports.hourlyAvgForDay3SitesParametric = function(req, res) {
    req.checkQuery('day', 'Invalid date!').isDate();
    req.checkQuery('senstypeid', 'Invalid sensor type id!').isInt();
    req.checkQuery('measdescr', 'Invalid measurement description!').isAlpha;

    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 400);
    }
    
    var day = req.query.day;
    var senstypeid = req.query.senstypeid;
    var measdescr = req.query.measdescr;
    
    /* the query can be a sum of queries, use „UNION“ and for every column that  is missed in one query but needed in another query add in the SELECT part: „null as <missed_column_name>“
    */
    
    query("SELECT tick , sum(value1) as value1, sum(value2) as value2, sum(value3) as value3 \
FROM ( \
SELECT date_trunc('hour', data_value.timestamp) as tick, avg(data_value.value) as value1, null::numeric as value2, null::numeric as value3 \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' \
AND sensor.station_id = 1 \
AND sensor_type.sensor_type_id = $2::int \
AND measurement_description.type = $3::text \
GROUP BY 1 \
UNION SELECT date_trunc('hour', data_value.timestamp) as tick, null::numeric as value1, avg(data_value.value) as value2, null::numeric as value3 \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' \
AND sensor.station_id = 3 \
AND sensor_type.sensor_type_id = $2::int \
AND measurement_description.type = $3::text \
GROUP BY 1 \
UNION SELECT date_trunc('hour', data_value.timestamp) as tick, null::numeric as value1, null::numeric as value2, avg(data_value.value) as value3 \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' \
AND sensor.station_id = 2 \
AND sensor_type.sensor_type_id = $2::int \
AND measurement_description.type = $3::text \
GROUP BY 1)t \
GROUP BY 1 ORDER BY 1 ASC", [day, senstypeid, measdescr], function (err, rows, result){
         //checks errors in the connection to the db
         if(!err){
             res.json(rows);
         } else {
            res.status(503).send(err);
         }
     });
 }; 


/* This is a generic query that given day, station, sensor_type description, measurement description and sensors heights
 * returns the timestamp, the average per hour and of the value (averaged through the sensors, if there are more than
 * one). 
 */
exports.hourlyAvgForDayParametric = function(req, res) { // exports connects it to the db specifics in server/config/environment/development.js and index is the variable that contains the result of the query
  
    req.checkQuery('day', 'Invalid date!').isDate();
    req.checkQuery('station', 'Invalid sensor station!').isInt();
    req.checkQuery('senstypeid', 'Invalid sensor type id!').isInt();
    req.checkQuery('measdescr', 'Invalid measurement description!').isAlpha;
    /*req.checkQuery('sensheight1', 'Invalid sensor height!').isInt();
    req.checkQuery('sensheight2', 'Invalid sensor height!').isInt();*/
      
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 400);
    }
    
    var day = req.query.day;
    var station = req.query.station;
    var senstypeid = req.query.senstypeid;
    var measdescr = req.query.measdescr;
    /*var sensheight1 = req.query.sensheight1;
    var sensheight2 = req.query.sensheight2;*/
    
    query("SELECT date_trunc('hour', data_value.timestamp) as tick, avg(data_value.value) as value, sensor_type.description as senstypedescr \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp AND $1::timestamp + time '23:59:59' \
AND sensor.station_id = $2::int \
AND sensor_type.sensor_type_id = $3::int \
AND measurement_description.type = $4::text \
GROUP BY 1,3 ORDER BY 1 ASC", [day, station, senstypeid, measdescr], function (err, rows, result){ 
         //checks errors in the connection to the db
         if(!err){
             res.json(rows);
         } else {
            res.status(503).send(err);
         }
     });
 }; 

exports.hourlyCumulativeRainForDay = function(req, res) {  
  req.checkQuery('day', 'Invalid date!').isDate();
  req.checkQuery('station', 'Invalid station!').isInt();
  
  var errors = req.validationErrors();
  if (errors) {
    res.send('There have been validation errors: ' + util.inspect(errors), 400);
  }
  
    var day = req.query.day;
    var station = req.query.station;
    
    query("SELECT tick, sum(value) OVER (ORDER BY tick) as value, senstypedescr \
FROM \
(SELECT date_trunc('hour', data_value.timestamp) as tick, sum(data_value.value) as value, sensor_type.description as senstypedescr \
FROM data_value, sensor, measurement_description, sensor_type \
WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN  $1::timestamp AND $1::timestamp + time '23:59:59' \
AND sensor.station_id = $2::int \
AND sensor_type.sensor_type_id = 14 \
AND measurement_description.type = 'tot' \
GROUP BY 1,3)t \
GROUP BY 1,3, value ORDER BY 1 ASC", [day,station] ,function (err, rows, result) {
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

/* This query is created starting from the imputs given and it is performs all the queries needed by the "Weather" section */
exports.genericQuery = function(req, res) {
    
    req.checkQuery('timeInterval', 'Invalid time interval description').isAlpha;
    req.checkQuery('day', 'Invalid date!').isDate();
    req.checkQuery('senstypeid', 'Invalid sensor type id!').isInt();
    req.checkQuery('measdescr', 'Invalid measurement description!').isAlpha;
    req.checkQuery('station', 'Invalid station!').isInt(); //add: it should be >=0, <=3

    
    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors: ' + util.inspect(errors), 400);
    }
    
    var timeInterval = req.query.timeInterval;
    var day = req.query.day;
    var senstypeid = req.query.senstypeid;
    var measdescr = req.query.measdescr;
    var station = req.query.station;
    
    var queryText;
    
    var dateTrunc_chosen;
    var dateTrunc_1day = "date_trunc('day', data_value.timestamp) ";
    var dateTrunc_1h = "date_trunc('hour', data_value.timestamp) ";
    var dateTrunc_2h = "date_trunc('day', data_value.timestamp) + \
    INTERVAL '1 hour' * round(extract('hour' from timestamp) / 2) * 2 ";
    var dateTrunc_15m = "date_trunc('hour', data_value.timestamp) + \
    INTERVAL '1 minute' * round(extract('minute' from timestamp) / 15) * 15 ";
    
    // time interval selection
    var timeInterval_chosen;
    var timeInterval_oneDay = " - interval '1 day' ";
    var timeInterval_oneMonth = " - interval '1 month'";
    
    if (timeInterval == "One day") {
        dateTrunc_chosen = dateTrunc_15m;
        timeInterval_chosen = timeInterval_oneDay;
    } else { // timeInterval == "One month"
        dateTrunc_chosen = dateTrunc_2h;//dateTrunc_2h;
        timeInterval_chosen = timeInterval_oneMonth;
    }
    
    // single station query parts
    var selectOneStation = "SELECT " + dateTrunc_chosen + "as tick, avg(data_value.value) as value, sensor_type.description as senstypedescr ";
    var fromOneStation = "FROM data_value, sensor, measurement_description, sensor_type ";
    var whereOneStation = "WHERE data_value.sensor_id = sensor.sensor_id \
AND data_value.measurement_description_id = measurement_description.measurement_description_id \
AND sensor_type.sensor_type_id = sensor.sensor_type_id \
AND data_value.timestamp BETWEEN $1::timestamp " + timeInterval_chosen + "AND $1::timestamp \
AND sensor_type.sensor_type_id = $2::int \
AND measurement_description.type = $3::text \
AND sensor.station_id = "; // the sensor.station_id has to be added
    var groupByOneStation1 = "GROUP BY 1 ";
    var groupByOneStation13 = "GROUP BY 1,3 ORDER BY 1 ASC ";
    
    var queryOneStation = selectOneStation + fromOneStation + whereOneStation + "$4::int ";
    
    
    // all stations query parts
    var selectAllStations = "SELECT tick , sum(value1) as value1, sum(value2) as value2, sum(value3) as value3 ";
    var fromSelectAllStations_firstStation = "FROM ( \
SELECT " + dateTrunc_chosen + "as tick, avg(data_value.value) as value1, null::numeric as value2, null::numeric as value3 ";
    var fromSelectAllStations_secondStation = "UNION SELECT " + dateTrunc_chosen + "as tick, null::numeric as value1, avg(data_value.value) as value2, null::numeric as value3 ";
    var fromSelectAllStations_thirdStation = "UNION SELECT " + dateTrunc_chosen + "as tick, null::numeric as value1, null::numeric as value2, avg(data_value.value) as value3 ";
    var groupByAllStations = ")t GROUP BY 1 ORDER BY 1 ASC";
    
    var queryAllStations = selectAllStations + fromSelectAllStations_firstStation + fromOneStation + whereOneStation + "1 " + groupByOneStation1 + 
            fromSelectAllStations_secondStation + fromOneStation + whereOneStation + "2 " + groupByOneStation1 +
            fromSelectAllStations_thirdStation + fromOneStation + whereOneStation + "3 " + groupByOneStation1 +
            groupByAllStations;

    
    // cumulative rain
    var selectOneStation_cumulativeRain= "SELECT tick, sum(value) OVER (ORDER BY tick) as value, senstypedescr \
FROM \
(";
    var selectAllStations_cumulativeRain = "SELECT tick, sum(value1) OVER (ORDER BY tick) as value1, sum(value2) OVER (ORDER BY tick) as value2, sum(value3) OVER (ORDER BY tick) as value3 \
FROM \
(";
    var groupByOneStation_cumulativeRain = ")c GROUP BY 1,3, value ORDER BY 1 ASC ";
    var groupByAllStations_cumulativeRain = ")c GROUP BY 1, value1, value2, value3 ORDER BY 1 ASC ";

    // soil temperature, the sensor height is needed
    var whereOneStation_sensorHeight = "AND sensor.height = 10 ";
    
    if (station == 0) {
        if (senstypeid == 14) // cumulative rain
            /*
            SELECT tick, sum(value1) OVER (ORDER BY tick) as value1, sum(value2) OVER (ORDER BY tick) as value2, sum(value3) OVER (ORDER BY tick) as value3
FROM 
(SELECT tick , sum(value1) as value1, sum(value2) as value2, sum(value3) as value3 
FROM ( 
SELECT date_trunc('hour', data_value.timestamp) as tick, avg(data_value.value) as value1, null::numeric as value2, null::numeric as value3 
FROM data_value, sensor, measurement_description, sensor_type
WHERE data_value.sensor_id = sensor.sensor_id 
AND data_value.measurement_description_id = measurement_description.measurement_description_id 
AND sensor_type.sensor_type_id = sensor.sensor_type_id 
AND data_value.timestamp BETWEEN '2014-03-22 00:00:00' AND '2014-03-22 23:59:59'
AND sensor_type.sensor_type_id = 14
AND measurement_description.type = 'tot' 
AND sensor.station_id = 1
GROUP BY 1
UNION SELECT date_trunc('hour', data_value.timestamp) as tick, null::numeric as value1, avg(data_value.value) as value2, null::numeric as value3 
FROM data_value, sensor, measurement_description, sensor_type
WHERE data_value.sensor_id = sensor.sensor_id 
AND data_value.measurement_description_id = measurement_description.measurement_description_id 
AND sensor_type.sensor_type_id = sensor.sensor_type_id 
AND data_value.timestamp BETWEEN '2014-03-22 00:00:00' AND '2014-03-22 23:59:59'
AND sensor_type.sensor_type_id = 14
AND measurement_description.type = 'tot' 
AND sensor.station_id = 2
GROUP BY 1
UNION SELECT date_trunc('hour', data_value.timestamp) as tick, null::numeric as value1, null::numeric as value2, avg(data_value.value) as value3 
FROM data_value, sensor, measurement_description, sensor_type
WHERE data_value.sensor_id = sensor.sensor_id 
AND data_value.measurement_description_id = measurement_description.measurement_description_id 
AND sensor_type.sensor_type_id = sensor.sensor_type_id 
AND data_value.timestamp BETWEEN '2014-03-22 00:00:00' AND '2014-03-22 23:59:59'
AND sensor_type.sensor_type_id = 14
AND measurement_description.type = 'tot' 
AND sensor.station_id = 3
GROUP BY 1
)t GROUP BY 1 ORDER BY 1 ASC
)c GROUP BY 1, value1, value2, value3 ORDER BY 1 ASC
            */
            queryText = selectAllStations_cumulativeRain + queryAllStations + groupByAllStations_cumulativeRain;
        else // not cumulative rain
            queryText = queryAllStations;
        
        query(queryText, [day, senstypeid, measdescr], function (err, rows, result){
            //checks errors in the connection to the db
            if(!err){
                res.json(rows);
            } else {
                res.status(503).send(err);
            }
        });
    }
    else {
        
        if (senstypeid == 14) // cumulative rain
            queryText = selectOneStation_cumulativeRain + queryOneStation + groupByOneStation13 + 
                groupByOneStation_cumulativeRain;
        else if (senstypeid == 3) // soil temperature, the sensor height is needed
            queryText = queryOneStation + whereOneStation_sensorHeight + groupByOneStation13;
        else // any other plot
            /*
                "SELECT date_trunc('hour', data_value.timestamp) + INTERVAL '1 minute' * round(extract('minute' from timestamp) / 15) * 15 as tick, avg(data_value.value) as value, sensor_type.description as senstypedescr
                FROM data_value, sensor, measurement_description, sensor_type 
                WHERE data_value.sensor_id = sensor.sensor_id 
                AND data_value.measurement_description_id = measurement_description.measurement_description_id 
                AND sensor_type.sensor_type_id = sensor.sensor_type_id 
                AND data_value.timestamp BETWEEN $1::timestamp - interval '1 day' AND $1::timestamp 
                AND sensor_type.sensor_type_id = $2::int 
                AND measurement_description.type = $3::text 
                AND sensor.station_id = $4::int
                GROUP BY 1,3 ORDER BY 1 ASC ";
            */
            queryText = queryOneStation + groupByOneStation13;
        
        query(queryText, [day, senstypeid, measdescr, station], function (err, rows, result){
            //checks errors in the connection to the db
            if(!err){
                res.json(rows);
            } else {
                res.status(503).send(err);
            }
        });
    }
    
    
 }; 
