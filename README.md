# ![graffiti](https://cloud.githubusercontent.com/assets/1764512/8900273/9ed758dc-343e-11e5-95ba-e82f876cf52d.png)

[![npm version](https://badge.fury.io/js/%40risingstack%2Fgraffiti.svg)](https://badge.fury.io/js/%40risingstack%2Fgraffiti)
[ ![Codeship Status for RisingStack/graffiti](https://codeship.com/projects/0c4fb010-5969-0133-8c37-4255fd5efb39/status?branch=master)](https://codeship.com/projects/110029)
[![bitHound Overall Score](https://www.bithound.io/github/RisingStack/graffiti/badges/score.svg)](https://www.bithound.io/github/RisingStack/graffiti)
[![Known Vulnerabilities](https://snyk.io/test/npm/@risingstack/graffiti/badge.svg)](https://snyk.io/test/npm/@risingstack/graffiti)

Currently the consumption of HTTP REST APIs dominate the client-side world,
[GraphQL](https://github.com/facebook/graphql) aims to change this.
This transition can be time-consuming - this is where graffiti comes into the picture.

We don't want to rewrite our application - no one wants that.
graffiti provides an [Express](http://expressjs.com) middleware, a [Hapi](http://hapijs.com) plugin and a
[Koa](http://koajs.com) middleware to convert your existing models into a GraphQL schema and exposes it over HTTP.

## What is GraphQL?

GraphQL is a query language created by Facebook in 2012 which provides a common interface between the client and the server for data fetching and manipulations.

The client asks for various data from the GraphQL server via queries. The response format is described in the query and defined by the client instead of the server: they are called client‐specified queries.

For more info check out RisingStack's [GraphQL tutorial](https://blog.risingstack.com/graphql-overview-getting-started-with-graphql-and-nodejs/).

## Example server and queries

For a running **example server** and **executable queries**, check out our example repository and play with your GraphQL queries: [graffiti-example](https://github.com/RisingStack/graffiti/tree/master/example)

## Adapters

* [mongoose](https://github.com/RisingStack/graffiti-mongoose)
* more coming...

## Supported servers

* [Express](https://github.com/RisingStack/graffiti#express)
* [Hapi](https://github.com/RisingStack/graffiti#hapi)
* [Koa](https://github.com/RisingStack/graffiti#koa)

## Install

```bash
npm install @risingstack/graffiti --save
```

## Usage

0. run MongoDB
1. register the middleware
2. provide a schema (returned by an adapters `getSchema` method or your own `GraphQLSchema` instance)
3. the GraphQL endpoint is available on `/graphql`

### Express

```javascript
import express from 'express';
import { json } from 'body-parser';
import graffiti from '@risingstack/graffiti';
import { getSchema } from '@risingstack/graffiti-mongoose';

import Cat from './models/Cat';
import User from './models/User';

const app = express();

// parse body as json
app.use(json());

app.use(graffiti.express({
  schema: getSchema([User, Cat]),
  context: {} // custom context
}));

app.listen(3000);
```

### Hapi

```javascript
import { Server } from 'hapi';
import graffiti from '@risingstack/graffiti';
import { getSchema } from '@risingstack/graffiti-mongoose';

const server = new Server();
server.connection({ port: 3000 });

server.register({
  register: graffiti.hapi,
  options: {
    schema: getSchema([User, Cat]),
    context: {} // custom context
    config: {} // config parameter for hapi graphql route
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
import koa from 'koa';
import parser from 'koa-bodyparser';
import graffiti from '@risingstack/graffiti';
import { getSchema } from '@risingstack/graffiti-mongoose';

import Cat from './models/Cat';
import User from './models/User';

const app = koa();

app.use(parser());

app.use(graffiti.koa({
  schema: getSchema([User, Cat]),
  context: {} // custom context
}));

app.listen(3000);
```

## Options

- `schema`: a `GraphQLSchema` instance. You can use an adapters `getSchema` method, or provide your own schema. (required)
- `graphiql`: may present [GraphiQL](https://github.com/graphql/graphiql) when loaded directly from a browser. (default: `true`)
- `context`: custom GraphQL context object. (default: `{}`)

## Test

```bash
npm test
```
