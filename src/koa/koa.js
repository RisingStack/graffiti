import { graphql } from 'graphql';
import {
  required,
  isPath,
  isGet,
  isPost,
  renderGraphiQL
} from '../util';

function accepts(type) {
  return this.headers && this.headers.accept && this.headers.accept.includes(type);
}

export default function middleware({ graphiql = true, schema = required() } = {}) {
  return function *middleware(next) {
    if (isPath(this) && (isPost(this) || isGet(this))) {
      const body = this.request.body;
      const { query, variables } = Object.assign({}, body, this.query);

      if (isGet(this) && accepts.call(this, 'html') && graphiql) {
        this.body = renderGraphiQL({ query, variables });
        return this.body;
      }

      if (isGet(this) && query && query.includes('mutation')) {
        this.status = 406;
        this.body = 'GraphQL mutation only allowed in POST request.';
        return this.body;
      }

      const parsedVariables = (typeof variables === 'string' && variables.length > 0) ?
        JSON.parse(variables) : variables;

      this.body = yield graphql(schema, query, this, parsedVariables);
      return this.body;
    }

    yield next;
  };
}
