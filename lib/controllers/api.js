'use strict';

var query = require('pg-query');

/**
 * Get number of measurement records
 */
exports.dataCount = function (req, res) {
  
  query.first('SELECT count(*) FROM data_val', function (err, result) {
    
    res.json(
      result
    );
    
  });

};

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    }, {
      name : 'Express',
      info : 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }, {
			name : 'PostgreSQL',
			info : 'PostgreSQL is a powerful, open source object-relational database system'
		} 
  ]);
};
