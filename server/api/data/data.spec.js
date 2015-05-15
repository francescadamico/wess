'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

/*
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
      .get('/api/data/hourlyAvgForDayParametric?day=2014-03-22T00:00:00.000Z&station=1&measdescr=avg&senstypeid=7&sensheight1=187&sensheight2=287')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/data/hourlyAvgForDayParametric with invalid day and measdescr and senstypeid and sensheight1 and sensheight2', function() {

  it('should respond with HTTP 400', function(done) {
    request(app)
      .get('/api/data/hourlyAvgForDayParametric?day=2014-03-32&measdescr=123&senstypeid=abc&sensheight1=abc&sensheight2=abc')
      .expect(400)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});

describe('GET /api/data/genericQuery with valid inputs', function() {

  it('should respond with data as JSON array', function(done) {
    request(app)
      .get('/api/data/genericQuery?day=2014-03-22T00:00:00.000Z&station=1&measdescr=avg&senstypeid=7')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/data/genericQuery with invalid day and measdescr and senstypeid and station', function() {

  it('should respond with HTTP 400', function(done) {
    request(app)
      .get('/api/data/hourlyAvgForDayParametric?day=2014-03-32&measdescr=123&senstypeid=abc&station=abc&')
      .expect(400)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});
*/


describe('GET /api/data/chnId with valid inputs', function() {

  it('should respond with data as JSON array', function(done) {
    request(app)
      .get('/api/data/chnId?channel=Tensio01&station=tail&statistic=Avg')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/data/chnId with invalid channel and station and statistic', function() {

  it('should respond with HTTP 400', function(done) {
    request(app)
      .get('/api/data/chnId?channel=123&station=123&statistic=123')
      .expect(400)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});

describe('GET /api/data/dataQuery with valid inputs', function() {

  it('should respond with data as JSON array', function(done) {
    request(app)
      .get('/api/data/dataQuery?timeInterval=One day,day=2014-03-01,channel=Tensio01,station=tail')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceOf(Array);
        done();
      });
  });
});

describe('GET /api/data/dataQuery with invalid day and measdescr and senstypeid and station', function() {

  it('should respond with HTTP 400', function(done) {
    request(app)
      .get('/api/data/dataQuery?timeInterval=123,day=2014-03-32,channel=123,station=123')
      .expect(400)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  });
});
