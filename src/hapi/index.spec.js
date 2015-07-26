var expect = require('chai').expect;

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

});
