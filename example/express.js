import express from 'express';
import { json } from 'body-parser';
import graffiti from '../';
import schema from './schema';

const app = express();

app.use(json());

app.use(graffiti.express({
  schema
}));

// redirect all requests to /graphql
// to open GraphiQL by default
app.use((req, res) => {
  res.redirect('/graphql');
});

app.listen(3001, (err) => {
  if (err) {
    throw err;
  }

  console.log('Express server is listening on port 3001');
});
