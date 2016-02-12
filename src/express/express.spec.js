import { expect } from 'chai';
import express from './';

describe('graffiti express', () => {
  const mwFactory = express;

  describe('checks for required options', () => {
    it('should throw an error if not all met', () => {
      // schema is missing
      expect(() => mwFactory({
      })).to.throw(Error);
    });

    it('shouldn\'t throw an error if all is passed', () => {
      expect(() => mwFactory({
        schema: {}
      })).not.to.throw(Error);
    });
  });

  describe('checks for allowed methods', () => {
    it('should only allow GET and POST requests', function methodTest(done) {
      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'PUT',
        path: '/graphql'
      };

      const next = () => done();
      mw(request, null, next);
    });
  });

  describe('requested path matches with /graphql', () => {
    it('should handle requests', function pathTest(done) {
      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        path: '/notGraphql'
      };

      const next = () => done();
      mw(request, null, next);
    });

    it('should return with proper result on GET', function postTest(done) {
      const result = { data: 1 };
      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'GET',
        path: '/graphql',
        query: {
          query: '{data}',
          variables: {}
        },
        accepts: (type) => type === 'json'
      };

      const response = {
        json: ({ data }) => {
          expect(data).to.be.eql(result);
          done();
        }
      };

      mw(request, response);
    });

    it('should reject mutations on GET', function postTest(done) {
      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'GET',
        path: '/graphql',
        query: {
          query: `mutation mutate {
            updateData(data: "123") {
              data
            }
          }`
        },
        accepts: (type) => type === 'json'
      };

      const response = {
        status: () => response,
        send: ({ statusCode }) => {
          expect(statusCode).to.be.eql(405);
          done();
        }
      };

      mw(request, response);
    });

    it('should return with proper result on POST', function postTest(done) {
      const result = { data: 1 };
      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'POST',
        path: '/graphql',
        body: {
          query: '{data}',
          variables: {}
        },
        accepts: (type) => type === 'json'
      };

      const response = {
        json: ({ data }) => {
          expect(data).to.be.eql(result);
          done();
        }
      };

      mw(request, response);
    });

    it('should successfully accept variables for mutations via POST', function postTest(done) {
      const result = { updateData: '123' };
      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'POST',
        path: '/graphql',
        body: {
          query: `mutation mutate($data: String!) {
            updateData(data: $data)
          }`,
          variables: '{ "data": "123" }'
        },
        accepts: (type) => type === 'json'
      };

      const response = {
        json: ({ data }) => {
          expect(data).to.be.eql(result);
          done();
        }
      };

      mw(request, response);
    });

    it('should return with GraphiQL on GET when it is enabled', function getTest(done) {
      const mw = mwFactory({
        schema: this.schema
      });

      const request = {
        method: 'GET',
        path: '/graphql',
        accepts: (type) => type === 'html'
      };

      const response = {
        send: (data) => {
          expect(data.includes('GraphiQL')).to.be.ok; // eslint-disable-line
          done();
        }
      };

      mw(request, response);
    });

    it('should not provide GraphiQL when it is disabled', function getTest(done) {
      const mw = mwFactory({
        schema: this.schema,
        graphiql: false
      });

      const request = {
        method: 'GET',
        path: '/graphql',
        query: {
          query: '{data}',
          variables: {}
        },
        accepts: (type) => type === 'html'
      };

      const result = { data: 1 };
      const response = {
        json: ({ data }) => {
          expect(data).to.be.eql(result);
          done();
        }
      };

      mw(request, response);
    });
  });
});
