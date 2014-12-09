'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/data', function() {

  it('should respond with count property', function(done) {
    request(app)
      .get('/api/data')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('count');
        done();
      });
  });
});

describe('GET /api/data/hourlyAvgForDay with valid inputs', function() {

  it('should respond with data as JSON array', function(done) {
    request(app)
      .get('/api/data/hourlyAvgForDay?day=2014-03-22T00:00:00.000Z&station=1&height=250&measdescr=avg&senstypedescr=temperature')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/data/hourlyAvgForDay with invalid day and sensorid', function() {

  it('should respond with HTTP 400', function(done) {
    request(app)
      .get('/api/data/hourlyAvgForDay?day=2014-03-32&station=abc&height=abc&measdescr=123&senstypedescr=123')
      .expect(400)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});

describe('GET /api/data/hourlyAvgForDay3Sites with valid inputs', function() {

  it('should respond with data as JSON array', function(done) {
    request(app)
      .get('/api/data/hourlyAvgForDay3Sites?day=2014-03-22T00:00:00.000Z&measdescr=avg&senstypedescr=temperature')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/data/hourlyAvgForDay3Sites with invalid day and sensorid', function() {

  it('should respond with HTTP 400', function(done) {
    request(app)
      .get('/api/data/hourlyAvgForDay3Sites?day=2014-03-32&measdescr=123&senstypedescr=123')
      .expect(400)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});


//day, station, senstypedescr, measdescr,sensheight1,sensheight2
describe('GET /api/data/hourlyAvgForDayParametric with valid inputs', function() {

  it('should respond with data as JSON array', function(done) {
    request(app)
      .get('/api/data/hourlyAvgForDayParametric?day=2014-03-22T00:00:00.000Z&station=2&measdescr=avg&senstypedescr=temperature&sensheight1=150&sensheight2=250')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/data/hourlyAvgForDayParametric with invalid day and sensorid', function() {

  it('should respond with HTTP 400', function(done) {
    request(app)
      .get('/api/data/hourlyAvgForDayParametric?day=2014-03-32&measdescr=123&senstypedescr=123&sensheight1=abc&sensheight2=abc')
      .expect(400)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});