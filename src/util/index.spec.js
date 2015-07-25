var expect = require('chai').expect;

describe('graffiti util', function() {

  var util = require('./');

  describe('#checkDep', function() {

    it('throws if first argument is undefined', function() {

      try {
        util.checkDep()
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

    it('returns the property', function () {

      var prop = util.checkDep({
        colour: 'red'
      }, 'colour');

      expect(prop).to.eql('red');

    });

  });

});
