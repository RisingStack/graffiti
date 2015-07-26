var express = require('express');
var graffiti = require('../');
var graffitiMongoose = require('@risingstack/graffiti-mongoose');

var app = express();

app.use(graffiti.express({
  prefix: '/graphql',
  adapter: graffitiMongoose,
  models: []
}));

app.listen(3000, function (err) {
  if (err) {
    throw err
  };

  console.log('server is listening');
});
