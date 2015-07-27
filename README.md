# ![graffiti](https://cloud.githubusercontent.com/assets/1764512/8900273/9ed758dc-343e-11e5-95ba-e82f876cf52d.png)

[![Build Status](https://travis-ci.org/RisingStack/graffiti.svg)](https://travis-ci.org/RisingStack/graffiti)  

Currently the consumption of HTTP REST APIs dominate the client-side world,
[GraphQL](https://github.com/facebook/graphql) aims to change this.
This transition can be time-consuming - this is where graffiti comes into the picture.

We don't want to rewrite our application - no one wants that.
graffiti provides an [Express](http://expressjs.com) middleware, a [Hapi](http://hapijs.com) plugin and a
[Koa](http://koajs.com) middleware to convert your existing models into a GraphQL schema and exposes it over HTTP.

## Adapters

* [mongoose](https://github.com/RisingStack/graffiti-mongoose)
* more coming soon...

## Supported servers

* [Express](https://github.com/RisingStack/graffiti#express)
* [Hapi](https://github.com/RisingStack/graffiti#hapi)
* [Koa](https://github.com/RisingStack/graffiti#koa)

## Install

```
npm install @risingstack/graffiti --save
```

## Usage

### Express

```javascript
var express = require('express');
var graffiti = require('@risingstack/graffiti');
var graffitiMongoose = require('@risingstack/graffiti-mongoose');
var User = require('./models/user');
var Cat = require('./models/cat');

var app = express();
app.use(graffiti.express({
  prefix: '/graphql',
  adapter: graffitiMongoose,
  models: [User, Cat]
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

## Test

```
npm test
```
