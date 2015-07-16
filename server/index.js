'use strict';

var app = require('./app'),
  db = require('./db'),
  fs = require('fs'),
  https = require('https');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var port = 8080;
var server = https.createServer(options, app).listen(port, function() {
  console.log('HTTP server patiently listening on port', port);
});

var port = 3000;
var server = app.listen(port, function() {
  console.log('HTTP server patiently listening on port', port);
});

module.exports = server;