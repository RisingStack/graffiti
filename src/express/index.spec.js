var expect = require('chai').expect;

describe('graffiti express', function() {

  var express = require('./');

  it('checks for required options');

  it('creates the schema');

  describe('requested url starts with prefix', function() {

    it('returns with proper results');

    it('returns with an error');

  });

  describe('requested url does not start with prefix', function() {

    it('calls the next middleware');

  });

});
