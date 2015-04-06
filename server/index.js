var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = app.use(bodyParser.urlencoded({extended: true}));

var tickets = [

];

app.set('port', (process.env.PORT || 3000));
app.use('/bower_components', express.static('../bower_components/'));
app.use(express.static('app/'));

var tickets = [

];

app.get('/tickets', function (req, res) {
    'use strict';
    
    res.send(tickets);
});

app.post('/tickets', jsonParser, function (req, res) {
    'use strict';
    
    if (!req.body) {
        return res.sendStatus(400);
    }
    tickets.push(req.body);

    io.emit('ticket', req.body);
    return res.sendStatus(200);
});

server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});