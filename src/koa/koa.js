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

export default function middleware({ graphiql = true, context = {}, schema = required() } = {}) {
  return function *middleware(next) {
    if (isPath(this) && (isPost(this) || isGet(this))) {
      const body = this.request.body;
      const { query, variables } = Object.assign({}, body, this.query);

      if (isGet(this) && accepts.call(this, 'html') && graphiql) {
        this.body = renderGraphiQL({ query, variables });
        return this.body;
      }

      if (isGet(this) && query && query.includes('mutation')) {
        this.throw(406, 'GraphQL mutation only allowed in POST request.');
      }

      let parsedVariables = variables;
      try {
        parsedVariables = JSON.parse(variables);
      } catch (err) {
        // ignore
      }

      this.body = yield graphql(schema, query, { request: this.request }, context, parsedVariables);
      return this.body;
    }

    return yield next;
  };
}
