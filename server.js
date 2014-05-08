var http = require('http');
var express = require('express');
var browserify = require('browserify-middleware');

var app = express();

app.get('/index.js', browserify(__dirname + '/index.js', { transform: ['reactify']}));

app.get('/index.css', function (req, res) {
  res.sendfile(__dirname + '/index.css');
});

app.get('/*', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

http.createServer(app).listen(3000);
