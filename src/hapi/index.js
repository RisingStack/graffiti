var checkDep = require('../util').checkDep;
var boom = require('boom');

function create() {
  var plugin = {
    register: function(server, options, next) {

      var models = checkDep(options, 'models');
      var adapter = checkDep(options, 'adapter');

      var schema = adapter.getSchema(models);

      server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {

          var query = request.query.q;

          return adapter.graphql(schema, query)
            .then(function(result) {
              reply(result);
            })
            .catch(function(err) {
              reply(boom.badImplementation(err));
            });
        }
      });

      next();
    }
  };

  plugin.register.attributes = {
    name: 'graffiti-hapi',
    version: '1.0.0'
  };

  return plugin;
}

module.exports.create = create;
