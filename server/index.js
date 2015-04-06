var express = require('express');

var app = express();
app.use('/', express.static('app/'));
app.use('/bower_components', express.static('../bower_components/'));

var http   = require('http').Server(app);
var io     = require('socket.io')(http);

var bodyParser       = require('body-parser');
var jsonParser       = bodyParser.json();
var urlencodedParser = app.use(bodyParser.urlencoded({extended: true}));

var tickets = [];


app.get('/', function (req, res) {


});

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
    //console.log(req.body);

    io.emit('ticket', req.body);
    return res.sendStatus(200);
});

http.listen(3000, function () {
    'use strict';
    console.log('Connect to port 3000');
});