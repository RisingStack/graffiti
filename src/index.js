var koa = require('./koa');
var hapi = require('./hapi');
var express = require('./express');

module.exports.koa = koa.create();
module.exports.hapi = hapi.create();
module.exports.express = express.create();
