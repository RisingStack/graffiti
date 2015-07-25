var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiSubset = require('chai-subset');

before(function() {
  chai.use(chaiSubset);
  chai.use(sinonChai);
});

beforeEach(function() {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  this.sandbox.restore();
});
