'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/dataCount', function() {
  
  it('should respond with JSON object and have property count', function(done) {
    request(app)
      .get('/api/dataCount')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object).and.have.property('count');
        done();
      });
  });
});
