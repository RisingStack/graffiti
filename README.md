# graffiti

Currently the consumption of HTTP REST APIs dominate the client-side world,
GraphQL aims to change this.
This transition can be time-consuming - this is where graffiti comes into the picture.

We don't want to rewrite our application - no one wants that.
graffiti provides an express middleware, a hapi plugin and a
koa middleware to convert your existing models into a GraphQL schema and exposes it over HTTP.

## Install

```
npm i @risingstack/graffiti --save
```

## Usage

### Express

```javascript
var express = require('express');
var graffiti = require('@risingstack/graffiti');
var graffitiMongoose = require('@risingstack/graffiti-mongoose');

var app = express();
app.use(graffiti.express({
  prefix: '/graphql',
  adapter: graffitiMongoose,
  models: []
}));

app.listen(3000);
```

### Hapi

```javascript
var hapi = require('hapi');
var graffiti = require('@risingstack/graffiti');
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
```

### Koa

```javascript
var koa = require('koa');
var graffiti = require('@risingstack/graffiti');
var graffitiMongoose = require('@risingstack/graffiti-mongoose');

var app = koa();
app.use(graffiti.koa({
  prefix: '/graphql',
  adapter: graffitiMongoose,
  models: []
}));

app.listen(3000);
```
