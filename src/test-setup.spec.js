import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiSubset from 'chai-subset';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';

before(() => {
  chai.use(chaiSubset);
  chai.use(sinonChai);
});

beforeEach(function beforeEachTest() {
  this.sandbox = sinon.sandbox.create();
  this.schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQuery',
      fields: {
        data: {
          name: 'data',
          type: GraphQLInt,
          resolve: () => 1
        }
      }
    }),
    mutation: new GraphQLObjectType({
      name: 'RootMutationType',
      fields: {
        updateData: {
          type: GraphQLString,
          args: {
            data: {
              name: 'data',
              type: GraphQLString
            }
          },
          description: 'Returns the data provided',
          resolve: (obj, { data }) => {
            return data;
          }
        }
      }
    })
  });
});

afterEach(function afterEachTest() {
  this.sandbox.restore();
});
