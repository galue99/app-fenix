
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app'));







app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
