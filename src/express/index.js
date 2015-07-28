var checkDep = require('../util').checkDep;
var isPrefixed = require('../util').isPrefixed;
var isGet = require('../util').isGet;

function create() {
  return function(options) {

    var models = checkDep(options, 'models');
    var adapter = checkDep(options, 'adapter');
    var prefix = checkDep(options, 'prefix');

    var schema = adapter.getSchema(models);

    return function(request, respone, next) {

      var query = request.query.q;

      if (isGet(request) && isPrefixed(request, prefix)) {
        return adapter.graphql(schema, query)
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
