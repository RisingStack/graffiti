import {expect} from 'chai';
import graffiti from './';

describe('graffiti', () => {
  it('should expose an express function', () => {
    expect(graffiti.express).to.be.ok; // eslint-disable-line
  });

  it('should expose an hapi function', () => {
    expect(graffiti.hapi).to.be.ok; // eslint-disable-line
  });

  it('should expose an koa function', () => {
    expect(graffiti.koa).to.be.ok; // eslint-disable-line
  });
});
