'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/hourlyAvgForDay', controller.hourlyAvgForDay);
router.get('/hourlyAvgForDay3Sites', controller.hourlyAvgForDay3Sites);
router.get('/hourlyAvgForDay3SitesParametric', controller.hourlyAvgForDay3SitesParametric);
router.get('/hourlyAvgForDayParametric', controller.hourlyAvgForDayParametric);
router.get('/hourlyCumulativeRainForDay',controller.hourlyCumulativeRainForDay);
module.exports = router;