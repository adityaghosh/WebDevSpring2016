var express = require('express');

var app             = express();
var bodyParser      = require('body-parser');
var multer          = require('multer');
// Adding Mongoose library.
var mongoose        = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname+'/public'));



app.get('/hello', function(req, res){
    res.send('hello world');
});

//Redirecting from project to project/client
app.get('/project', function(req, res) {
   res.redirect("./client/");
});

// Passing app to app.js of assignment.
require("./public/assignment/server/app.js")(app, db,mongoose);

require("./public/experiments/chatApp/server/app")(app);

// Passing app to app.js of project.
require("./public/project/server/app.js")(app);

var http = require('http').Server(app);
var io = require('socket.io')(http);

/*io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});*/

//Replacing app.listen with http.listen for chat application.
//http.listen(port,ipaddress);
app.listen(port, ipaddress);