import express from 'express';
import graffiti from '../';
import schema from './schema';

const app = express();
app.use(graffiti.express({
  schema
}));

app.listen(3001, (err) => {
  if (err) {
    throw err;
  }

  console.log('Express server is listening on port 3001');
});
