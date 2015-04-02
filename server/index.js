var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server);


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = app.use(bodyParser.urlencoded({extended: true}));

var eventos = [

];

app.set('port', (process.env.PORT || 5000));
app.use(express.static('../app/'));

var eventos = [

];

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

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});