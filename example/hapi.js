var Hapi = require('hapi');
var graffiti = require('../');
var graffitiMongoose = require('@risingstack/graffiti-mongoose');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.register({
  register: graffiti.hapi,
  options: {
    adapter: graffitiMongoose,
    models: []
  }
}, {
  routes: {
    prefix: '/graphql'
  }
}, function (err) {
  if (err) {
    console.error('Failed to load plugin:', err);
  }

  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
});
