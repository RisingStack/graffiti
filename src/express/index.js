var checkDep = require('../util').checkDep;
var isPrefixed = require('../util').isPrefixed;
var isGet = require('../util').isGet;
var isPost = require('../util').isPost;

function create() {
  return function(options) {

    var models = checkDep(options, 'models');
    var adapter = checkDep(options, 'adapter');
    var prefix = checkDep(options, 'prefix');

    var schema = adapter.getSchema(models);

    return function(request, respone, next) {

      var query;
      if (isGet(request)) {
        query = request.query.q;
      } else if (isPost(request)) {
        query = request.body.query;
      } else {
        return next();
      }

      if (isPrefixed(request, prefix)) {
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
