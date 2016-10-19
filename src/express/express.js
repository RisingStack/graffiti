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

export default function middleware({ graphiql = true, context = {}, schema = required(), getCSRFToken = null } = {}) {
  return (request, response, next) => {
    if (isPath(request) && (isPost(request) || isGet(request))) {
      const body = request.body;
      const { query, variables } = Object.assign({}, body, request.query);

      if (isGet(request) && request.accepts('html') && graphiql) {
        const renderOptions = { query, variables };
        if (getCSRFToken !== null) {
          renderOptions.csrfToken = getCSRFToken(request);
        }
        return response.send(renderGraphiQL(renderOptions));
      }

      if (isGet(request) && query && query.includes('mutation')) {
        const boom = methodNotAllowed('GraphQL mutation only allowed in POST request.');
        return sendError(response, boom);
      }

      let parsedVariables = variables;
      try {
        parsedVariables = JSON.parse(variables);
      } catch (err) {
        // ignore
      }

      return graphql(schema, query, { request }, context, parsedVariables)
        .then((result) => {
          if (result.errors) {
            const message = result.errors.map((error) => error.message).join('\n');
            const boom = badRequest(message);
            sendError(response, boom);
            return;
          }

          response.json(result);
        });
    }

    return next();
  };
}
