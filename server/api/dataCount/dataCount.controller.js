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