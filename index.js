var express = require('express');
var socket = require('socket.io');
var PORT = process.env.PORT || 5000;

// App setup

var app = express();

var server = app.listen(PORT, function(){
    console.log('listening to requests on port ' + PORT);
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    // Listen events
    socket.on('chat', function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing', function(data){
        io.sockets.emit('typing',data);
    });
});