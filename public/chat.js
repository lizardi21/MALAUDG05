// Make Connection
var socket = io.connect('https://mala-udg-05.herokuapp.com/');

// Query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),

// Emit events

btn.addEventListener('click', function() { console.log('BTN');

    socket.emit('chat', {
        clientId: socket.id,
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

// Listen events
socket.on('chat', function(data){
    //if (socket.id != data.clientId) client = data.clientId;
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});