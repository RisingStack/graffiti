var expect = require('chai').expect;

describe('graffiti express', function() {

  var express = require('./');

  describe('checks for required options', function() {

    it('throws an error if not all met', function() {

      try {
        express({
          prefix: '/graphql'
        });
      } catch (ex) {
        expect(ex).to.be.ok;
        return;
      }

      throw new Error('Error should have been thrown');

    });

    it('doesn\'t throw if all is passed', function() {

      var mw = express({
        prefix: '/graphql',
        models: [],
        adapter: {
          getSchema: function() {}
        }
      });

      expect(mw).to.be.ok;
    });
  });

  it('creates the schema', function() {

    var getSchemaSpy = this.sandbox.spy();
    var models = [{
      name: 'User'
    }];

    var mw = express({
      prefix: '/graphql',
      models: models,
      adapter: {
        getSchema: getSchemaSpy
      }
    });

    expect(getSchemaSpy).to.be.calledWith(models);
  });

  describe('requested url starts with prefix', function() {

    it('returns with proper results');

    it('returns with an error');

  });

  describe('requested url does not start with prefix', function() {

    it('calls the next middleware');

  });

});
