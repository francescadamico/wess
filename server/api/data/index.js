'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/hourlyAvgForDay', controller.hourlyAvgForDay);

module.exports = router;