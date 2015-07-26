var expect = require('chai').expect;
var Hapi = require('hapi');

describe('graffiti hapi', function() {

  var hapi = require('./');

  describe('checks for required options', function() {

    it('throws an error if not all met', function() {

      var mwFactory = hapi.create({
        graphql: {}
      });

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

  describe('returns with proper results', function(done) {

    var server = new Hapi.Server();
    server.connection({ port: 3000 });

    var result = {
      users: [1, 2, 3]
    };

    server.register({
      register: hapi.create({
        graphql: function() {
          return Promise.resolve(result);
        }
      }),
      options: {
        models: [],
        adapter: {
          getSchema: function() {}
        }
      }
    }, {
      routes: {
        prefix: '/graphql'
      }
    }, function(err) {
      if (err) {
        return done(err);
      }

      server.inject({
        method: 'GET',
        url: '/graphql?q={__type}'
      }, function(res) {
        expect(JSON.parse(res.payload)).to.eql(result);
        done();
      });
    });

  });

});
