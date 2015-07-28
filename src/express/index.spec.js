var expect = require('chai').expect;

describe('graffiti express', function() {

  var express = require('./');

  describe('checks for required options', function() {

    it('throws an error if not all met', function() {

      var mwFactory = express.create();

      try {
        mwFactory({
          prefix: '/graphql'
        });
      } catch (ex) {
        expect(ex).to.be.ok;
        return;
      }

      throw new Error('Error should have been thrown');

    });

    it('doesn\'t throw if all is passed', function() {

      var mwFactory = express.create();

      var mw = mwFactory({
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
    var mwFactory = express.create();
    var getSchemaSpy = this.sandbox.spy();
    var models = [{
      name: 'User'
    }];

    mwFactory({
      prefix: '/graphql',
      models: models,
      adapter: {
        getSchema: getSchemaSpy
      }
    });

    expect(getSchemaSpy).to.be.calledWith(models);
  });

  describe('requested url starts with prefix', function() {

    it('returns with proper results', function() {

      var result = {
        data: 1
      };

      var mwFactory = express.create();

      var mw = mwFactory({
        prefix: '/graphql',
        models: [],
        adapter: {
          getSchema: function() {},
          graphql: function() {
            return Promise.resolve();
          }
        }
      });

      var request = {
        method: 'GET',
        path: '/graphql',
        query: {
          q: '{__type}'
        }
      };

      var response = {
        json: function(d) {
          expect(d).to.eql(result);
        }
      };

      mw(request, response);
    });

  });

  describe('requested url does not start with prefix', function() {

    it('calls the next middleware', function() {

      var mwFactory = express.create();

      var mw = mwFactory({
        prefix: '/graphql',
        models: [],
        adapter: {
          getSchema: function() {},
          graphql: function() {
            return Promise.resolve();
          }
        }
      });

      var request = {
        method: 'GET',
        path: '/not-good',
        query: {
          q: '{__type}'
        }
      };

      var response = {};

      var nextSpy = this.sandbox.spy();

      mw(request, response, nextSpy);

      expect(nextSpy.called).to.be.ok;
    });

  });

});
