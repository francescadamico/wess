'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/hourlyAvgForDay', controller.hourlyAvgForDay);
router.get('/hourlyAvgForDay3Sites', controller.hourlyAvgForDay3Sites);
router.get('/hourlyAvgForDayParametric', controller.hourlyAvgForDayParametric);

module.exports = router;