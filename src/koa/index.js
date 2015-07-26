var checkDep = require('../util').checkDep;
var isPrefixed = require('../util').isPrefixed;
var isGet = require('../util').isGet;

function create(options) {

  var graphql = checkDep(options, 'graphql');

  return function koa(options) {

    var models = checkDep(options, 'models');
    var adapter = checkDep(options, 'adapter');
    var prefix = checkDep(options, 'prefix');

    var schema = adapter.getSchema(models);

    return function *(next) {

      var query = this.query.q;

      if (isGet(this) && isPrefixed(this, prefix)) {
        this.body = yield graphql(schema, query);
        return;
      }

      yield next;
    };
  };
}

module.exports.create = create;
