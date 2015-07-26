var graphql = require('graphql');

var koa = require('./koa');
var hapi = require('./hapi');
var express = require('./express');

module.exports.koa = koa.create({
  graphql: graphql.graphql
});
module.exports.hapi = hapi.create({
  graphql: graphql.graphql
});
module.exports.express = express.create({
  graphql: graphql.graphql
});
