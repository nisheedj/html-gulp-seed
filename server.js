/**
 * Use the node server to mock restfull api responses
 * as well as data transfer via socket.io
 */

var express = require('express');
var socket = require('socket.io');
var http = require('http');
var path = require('path');
var fs = require('fs');
var colors = require('colors/safe');

var app = express();
var server = http.Server(app);
var io = socket(server);

/*Set static resources*/
app.use('/css', express.static(path.join(__dirname, 'client', 'css')));
app.use('/js', express.static(path.join(__dirname, 'client', 'js')));
app.use('/img', express.static(path.join(__dirname, 'client', 'img')));
app.use('/fonts', express.static(path.join(__dirname, 'client', 'fonts')));
app.use('/pages', express.static(path.join(__dirname, 'client', 'pages')));
app.use('/bower_components', express.static(path.join(__dirname,'bower_components')));

/*Base index file*/
app.get('/', function(req, res) {
  console.log(colors.green('Route requested : %s'),req.route.path);
  res.sendFile('index.html', {
    root: __dirname + '/client/pages/'
  });
});


server.listen(9000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log(colors.green('Example app listening at http://%s:%s'), host, port);
});