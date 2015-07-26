var expect = require('chai').expect;

describe('graffiti util', function() {

  var util = require('./');

  describe('#isPrefixed', function() {

    it('returns true for request paths starting with prefix');

    it('returns false for request paths not starting with prefix');

  });

  describe('#isGet', function() {

    it('returns true for GET');

    it('returns false for not GETs');

  });

  describe('#checkDep', function() {

    it('throws if first argument is undefined', function() {

      try {
        util.checkDep();
      } catch (ex) {
        expect(ex.message).to.eql('Object cannot be undefined');
        return;
      }

      throw new Error('Error should have been thrown');
    });

    it('throws property does not exists', function() {

      try {
        util.checkDep({}, 'colour');
      } catch (ex) {
        expect(ex.message).to.eql('colour cannot be undefined');
        return;
      }

      throw new Error('Error should have been thrown');
    });

    it('returns the property', function() {

      var prop = util.checkDep({
        colour: 'red'
      }, 'colour');

      expect(prop).to.eql('red');

    });

  });

});
