var expect = require('chai').expect;

describe('graffiti koa', function() {

  var koa = require('./');

  describe('checks for required options', function() {

    it('throws an error if not all met', function() {

      var mwFactory = koa.create();

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

  });

  it('creates the schema', function() {
    var mwFactory = koa.create();
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

    it('returns with proper results', function *() {

      var result = {
        data: 1
      };

      var mwFactory = koa.create();

      var mw = mwFactory({
        prefix: '/graphql',
        models: [],
        adapter: {
          getSchema: function() {},
          graphql: function() {
            return Promise.resolve({
              data: 1
            });
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

      var res = yield mw.call(request);

      expect(res).to.eql(result);
    });

  });

  describe('requested url does not start with prefix', function() {

    it('calls the next middleware', function *(done) {

      var mwFactory = koa.create();

      var mw = mwFactory({
        prefix: '/graphql',
        models: [],
        adapter: {
          getSchema: function() {}
        }
      });

      var request = {
        method: 'GET',
        path: '/not-good',
        query: {
          q: '{__type}'
        }
      };

      yield mw.call(request, function *() {
        yield done();
      });

      throw new Error('next should have been called');
    });

  });

});
