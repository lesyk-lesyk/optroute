var express = require('express');
var app = express();

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/client/html/index.html");
});

var port = process.env.PORT || 3000;

var Server = require('http').createServer(app);
Server.listen(port, function(){
  console.log('Server listening on port', port);
});
