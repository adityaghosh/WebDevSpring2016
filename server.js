var express = require('express');

var app             = express();
var bodyParser      = require('body-parser');
var multer          = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname+'/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

// Passing app to app.js of assignment.
require("./public/assignment/server/app.js")(app);
require("./public/experiments/chatApp/server/app")(app);

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

//Replacing app.listen with http.listen for chat application.
http.listen(port,ipaddress);
//app.listen(port, ipaddress);