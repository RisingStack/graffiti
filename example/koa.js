import koa from 'koa';
import graffiti from '../';
import schema from './schema';

const app = koa();
app.use(graffiti.koa({
  schema
}));

app.listen(3003, (err) => {
  if (err) {
    throw err;
  }

  console.log('Koa server is listening on port 3003');
});
