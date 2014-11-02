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
      .get('/api/data/hourlyAvgForDay?day=2014-03-22T00:00:00.000Z&sensorid=197')
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
      .get('/api/data/hourlyAvgForDay?day=2014-03-32&sensorid=abc')
      .expect(400)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});