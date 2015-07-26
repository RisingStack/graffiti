var config = require('../config');
var checkDep = require('../util').checkDep;

function isGet(request) {
  return request.method === 'GET';
}

function isPrefixed(request, prefix) {
  return request.path.indexOf(prefix) === 0;
}

function create(options) {

  var graphql = checkDep(options, 'graphql');

  return function(options) {

    var models = checkDep(options, 'models');
    var adapter = checkDep(options, 'adapter');
    var prefix = checkDep(options, 'prefix');

    var schema = adapter.getSchema(models);

    return function(request, respone, next) {

      var query = request.query.q;

      if (isGet(request) && isPrefixed(request, prefix)) {
        return graphql(schema, query)
          .then(function(result) {
            respone.json(result);
          })
          .catch(function(err) {
            next(err);
          });
      }

      return next();
    };
  };
}

module.exports.create = create;
