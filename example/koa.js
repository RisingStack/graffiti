var koa = require('koa');
var graffiti = require('../');
var graffitiMongoose = require('@risingstack/graffiti-mongoose');

var app = koa();
app.use(graffiti.koa({
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
