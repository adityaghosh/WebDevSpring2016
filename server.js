var express = require('express');

var app             = express();
var bodyParser      = require('body-parser');
var multer          = require('multer');
// Adding Mongoose library.
var mongoose        = require('mongoose');
// Adding session
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
}

var secret = process.env.SESSION_SECRET;

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,

}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname+'/public'));


app.get('/hello', function(req, res){
    res.send('hello world');
});

//Redirecting from project to project/client
app.get('/project', function(req, res) {
   res.redirect("./client/");
});


var userModelAssignment = require('./public/assignment/server/models/user.model.server.js')(db, mongoose);
var userModelProject = require('./public/project/server/models/user.model.js')(db, mongoose);

require('./public/security/security.service.server')(app, userModelAssignment, userModelProject);
// Passing app to app.js of assignment.
require("./public/assignment/server/app.js")(app, db, mongoose, userModelAssignment);

require("./public/experiments/chatApp/server/app")(app);

require("./public/experiments/soundcloud/server/app")(app);

// Passing app to app.js of project.
require("./public/project/server/app.js")(app, db, mongoose, userModelProject);

var http = require('http').createServer(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    socket.on('chat message', function(id, msg){
        io.in(id).emit('chat message', msg);
    });
    socket.on('create', function(room) {
        socket.join(room);
    });
    socket.on('disconnect', function(){

    });
});

//Replacing app.listen with http.listen for chat application.
http.listen(port,ipaddress);
//app.listen(port, ipaddress);