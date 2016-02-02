import { Server } from 'hapi';
import graffiti from '../';
import schema from './schema';

const server = new Server();
server.connection({ port: 3003 });

// redirect all requests to /graphql
// to open GraphiQL by default
server.ext('onRequest', function redirect(request, reply) {
  if (request.path === '/graphql') {
    return reply.continue();
  }
  reply.redirect('/graphql');
});

server.register({
  register: graffiti.hapi,
  options: {
    schema
  }
}, (err) => {
  if (err) {
    console.error('Failed to load plugin:', err);
  }

  server.start(() => {
    console.log('Hapi server is listening on port 3003');
  });
});
