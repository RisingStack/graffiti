# graffiti

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
  adapter: graffitiMongoose',
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
  register: graffitiMongoose.hapi,
  options: {
    adapter: graffitiMongoose',
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

var app = express();
app.use(graffiti.koa({
  prefix: '/graphql',
  adapter: graffitiMongoose',
  models: []
}));

app.listen(3000);
```
