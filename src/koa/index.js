var checkDep = require('../util').checkDep;
var isPrefixed = require('../util').isPrefixed;
var isGet = require('../util').isGet;
var isPost = require('../util').isPost;

function create() {
  return function koa(options) {

    var models = checkDep(options, 'models');
    var adapter = checkDep(options, 'adapter');
    var prefix = checkDep(options, 'prefix');

    var schema = adapter.getSchema(models);

    return function *(next) {

      var query;
      if (isGet(this)) {
        query = this.query.q;
      } else if (isPost(this)) {
        query = this.body.query;
      } else {
        return next();
      }

      if (isPrefixed(this, prefix)) {
        this.body = yield adapter.graphql(schema, query);
        return this.body;
      }

      yield next;
    };
  };
}

module.exports.create = create;
