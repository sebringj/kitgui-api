(function () {
  /*global describe, it*/

  'use strict';

  var should = require('should');
	var express = require('express');
	var supertest = require('supertest');

  /* -------------------------------------------------------------------------- */

  var app = express();
	app.use('/api/v1', require('../lib/api/v1'));

  /* -------------------------------------------------------------------------- */

  describe('/api/v1/content/:id', function () {

    it('GET 200 works', function (done) {
      supertest(app)
        .get('/api/v1/content/abc123')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          //res.headers['access-control-allow-origin'].should.eql('*');
          //res.text.should.eql('Hello World (Get)');
          done();
        });
    });

    it('GET 404 works', function (done) {
      supertest(app)
        .get('/api/v1/content/abc1234')
        .expect(404)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          //res.headers['access-control-allow-origin'].should.eql('*');
          //res.text.should.eql('Hello World (Get)');
          done();
        });
    });

    it('POST works', function(done) {
      supertest(app)
        .post('/api/v1/content/abc1234', {
        	kind: 'kind',
        	content: {
            test: '123'
          }
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          done();
        });
    });

  });

/*
  describe('/api/v1/content', function() {

    it('DELETE works', function(done) {
      supertest(app)
        .delete('/api/v1/content/test/testing123')
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          done();
        });
    });

    it('POST works', function(done) {
      supertest(app)
        .post('/api/v1/content', {

        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          done();
        });
    });

  });

*/
}());
