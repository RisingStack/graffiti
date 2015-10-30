import {graphql} from 'graphql';
import {json} from 'co-body';
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

export default function middleware({graphiql = true, schema = required()} = {}) {
  return function *middleware(next) {
    if (isPath(this) && (isPost(this) || isGet(this))) {
      const body = yield json(this);
      const {query, variables} = Object.assign({}, body, this.query);

      if (isGet(this) && accepts.call(this, 'html') && graphiql) {
        this.body = renderGraphiQL({query, variables});
        return this.body;
      }

      if (isGet(this) && query && query.includes('mutation')) {
        this.status = 406;
        this.body = 'GraphQL mutation only allowed in POST request.';
        return this.body;
      }

      this.body = yield graphql(schema, query, this, variables);
      return this.body;
    }

    yield next;
  };
}
