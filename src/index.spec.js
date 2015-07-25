var expect = require('chai').expect;

describe('graffiti', function() {

  var graffiti = require('./');

  it('exposes an express function', function() {
    expect(graffiti.express).to.be.ok;
  });

  it('exposes an hapi function', function() {
    expect(graffiti.hapi).to.be.ok;
  });

  it('exposes an koa function', function() {
    expect(graffiti.koa).to.be.ok;
  });

});
