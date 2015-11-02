import {expect} from 'chai';
import parser from 'co-body';
import koa from './';

describe('graffiti koa', () => {
  beforeEach(function stub() {
    this.sandbox.stub(parser, 'json', (request) => Promise.resolve(request.payload || request.body));
  });

  describe('checks for required options', () => {
    it('should throw an error if not all met', () => {
      const mwFactory = koa;

      // schema is missing
      expect(() => mwFactory({
      })).to.throw(Error);
    });
  });

  describe('requested path matches with /graphql', () => {
    it('should return with proper result on GET', function *getTest() {
      const mwFactory = koa;

      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'GET',
        path: '/graphql',
        query: {
          query: '{data}',
          variables: {}
        }
      };

      const result = {data: 1};
      const res = yield mw.call(request);

      expect(res.data).to.eql(result);
    });

    it('should return with proper result on POST', function *postTest() {
      const mwFactory = koa;

      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'POST',
        path: '/graphql',
        payload: {
          query: '{data}',
          variables: {}
        }
      };

      const result = {data: 1};
      const res = yield mw.call(request);

      expect(res.data).to.eql(result);
    });

    it('should return with GraphiQL on GET when it is enabled', function *getTest() {
      const mwFactory = koa;

      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'GET',
        path: '/graphql',
        headers: {
          accept: 'text/html'
        }
      };

      const res = yield mw.call(request);

      expect(res.includes('GraphiQL')).to.be.ok; // eslint-disable-line
    });

    it('should not provide GraphiQL when it is disabled', function *getTest() {
      const mwFactory = koa;

      const mw = mwFactory({
        schema: this.schema,
        graphiql: false
      });

      const request = {
        method: 'GET',
        path: '/graphql',
        query: {
          query: '{data}'
        }
      };

      const result = {data: 1};
      const res = yield mw.call(request);
      expect(res.data).to.eql(result);
    });
  });
});
