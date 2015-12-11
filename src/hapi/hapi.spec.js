import { expect } from 'chai';
import { Server } from 'hapi';
import hapi from './';

describe('graffiti hapi', () => {
  describe('checks for required options', () => {
    it('should throw an error if not all met', () => {
      const mwFactory = hapi;

      // schema is missing
      expect(() => mwFactory({
      })).to.throw(Error);
    });
  });

  describe('requested path matches with /graphql', () => {
    it('should return with proper result on GET', function getTest(done) {
      const server = new Server();
      server.connection({ port: 3000 });

      const result = { data: 1 };

      server.register({
        register: hapi,
        options: {
          schema: this.schema
        }
      }, (err) => {
        if (err) {
          return done(err);
        }

        server.inject({
          method: 'GET',
          url: '/graphql?query={data}'
        }, ({ payload }) => {
          expect(JSON.parse(payload).data).to.eql(result);
          done();
        });
      });
    });

    it('should reject mutations on GET', function getTest(done) {
      const server = new Server();
      server.connection({ port: 3000 });

      server.register({
        register: hapi,
        options: {
          schema: this.schema
        }
      }, (err) => {
        if (err) {
          return done(err);
        }

        server.inject({
          method: 'GET',
          url: '/graphql?query=mutation%20mutate%20{updateData(data:"123"){data}}'
        }, ({ payload }) => {
          expect(JSON.parse(payload).error).to.be.ok; // eslint-disable-line
          done();
        });
      });
    });

    it('should return with proper result on POST', function postTest(done) {
      const server = new Server();
      server.connection({ port: 3000 });

      const result = { data: 1 };

      server.register({
        register: hapi,
        options: {
          schema: this.schema
        }
      }, (err) => {
        if (err) {
          return done(err);
        }

        server.inject({
          method: 'POST',
          url: '/graphql',
          payload: {
            query: '{data}',
            variables: {}
          }
        }, ({ payload }) => {
          expect(JSON.parse(payload).data).to.eql(result);
          done();
        });
      });
    });

    it('should return with GraphiQL on GET when it is enabled', function getTest(done) {
      const server = new Server();
      server.connection({ port: 3000 });

      server.register({
        register: hapi,
        options: {
          schema: this.schema
        }
      }, (err) => {
        if (err) {
          return done(err);
        }

        server.inject({
          method: 'GET',
          url: '/graphql',
          headers: {
            Accept: 'text/html'
          }
        }, ({ payload }) => {
          expect(payload.includes('GraphiQL')).to.be.ok; // eslint-disable-line
          done();
        });
      });
    });

    it('should not provide GraphiQL when it is disabled', function getTest(done) {
      const server = new Server();
      server.connection({ port: 3000 });

      server.register({
        register: hapi,
        options: {
          schema: this.schema,
          graphiql: false
        }
      }, (err) => {
        if (err) {
          return done(err);
        }

        server.inject({
          method: 'GET',
          url: '/graphql',
          headers: {
            Accept: 'text/html'
          }
        }, ({ statusCode }) => {
          expect(statusCode).to.be.eql(404);
          done();
        });
      });
    });
  });
});
