var express = require('express');

var app = express();
app.use('/', express.static('../app/'));
app.use('/bower_components', express.static('../bower_components/'));

var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = app.use(bodyParser.urlencoded({extended: true}));

var eventos = [

];


app.get('/', function (req, res) {


});

app.get('/eventos', function (req, res) {
    'use strict';
    
    res.send(eventos);
});

app.post('/eventos', jsonParser, function (req, res) {
    'use strict';
    
    if (!req.body) {
        return res.sendStatus(400);
    }
    eventos.push(req.body);

    io.emit('evento', req.body);
    return res.sendStatus(200);
});

http.listen(3000, function () {
    'use strict';
    console.log('Connect to port 3000');
});