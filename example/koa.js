import koa from 'koa';
import parser from 'koa-bodyparser';
import graffiti from '../';
import schema from './schema';

const app = koa();

app.use(parser());

app.use(graffiti.koa({
  schema
}));

// redirect all requests to /graphql
// to open GraphiQL by default
app.use(function *redirect() {
  this.redirect('/graphql');
});

app.listen(3002, (err) => {
  if (err) {
    throw err;
  }

  console.log('Koa server is listening on port 3002');
});
