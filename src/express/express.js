import { graphql } from 'graphql';
import { json } from 'co-body';
import {
  badRequest,
  methodNotAllowed
} from 'boom';
import {
  required,
  isPath,
  isGet,
  isPost,
  renderGraphiQL
} from '../util';

function sendError(response, boom) {
  const { statusCode, payload } = boom.output;
  response.status(statusCode).send(payload);
}

export default function middleware({ graphiql = true, schema = required() } = {}) {
  return (request, response, next) => {
    if (isPath(request) && (isPost(request) || isGet(request))) {
      let promise = Promise.resolve(request.body);
      if (!(request.body instanceof Object)) {
        promise = json(request);
      }
      return promise.then((body) => {
        const { query, variables } = Object.assign({}, body, request.query);

        if (isGet(request) && request.accepts('html') && graphiql) {
          return response.send(renderGraphiQL({ query, variables }));
        }

        if (isGet(request) && query && query.includes('mutation')) {
          const boom = methodNotAllowed('GraphQL mutation only allowed in POST request.');
          return sendError(response, boom);
        }

        return graphql(schema, query, request, variables)
          .then((result) => {
            if (result.errors) {
              const message = result.errors.map((error) => error.message).join('\n');
              const boom = badRequest(message);
              return sendError(response, boom);
            }

            response.json(result);
          });
      });
    }

    return next();
  };
}
