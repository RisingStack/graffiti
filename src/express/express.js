import { graphql } from 'graphql';
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
      const body = request.body;
      const { query, variables } = Object.assign({}, body, request.query);

      if (isGet(request) && request.accepts('html') && graphiql) {
        return response.send(renderGraphiQL({ query, variables }));
      }

      if (isGet(request) && query && query.includes('mutation')) {
        const boom = methodNotAllowed('GraphQL mutation only allowed in POST request.');
        return sendError(response, boom);
      }

      const parsedVariables = (typeof variables === 'string' && variables.length > 0) ?
        JSON.parse(variables) : variables;

      return graphql(schema, query, request, parsedVariables)
        .then((result) => {
          if (result.errors) {
            const message = result.errors.map((error) => error.message).join('\n');
            const boom = badRequest(message);
            return sendError(response, boom);
          }

          response.json(result);
        });
    }

    return next();
  };
}
