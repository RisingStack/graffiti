import {Server} from 'hapi';
import graffiti from '../';
import schema from './schema';

const server = new Server();
server.connection({port: 3002});
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
    console.log('Hapi server is listening on port 3002');
  });
});
