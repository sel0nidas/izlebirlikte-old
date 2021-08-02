"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
var users={};


var index=0;
var i;

io.on('connection', (socket) => {
    console.log("A user Connected");
    i=0;
    users[index] = socket.id;
    console.log("Kullanıcı Listesi");
    for(i=0;i<=index;i++){
        io.emit(console.log(i+1+".Kullanıcı: "+users[i]));
    }

    socket.on('event message', (msg) => {
        socket.broadcast.emit('event message', msg);
    });
    
    socket.on('player time', (time) => {
        socket.broadcast.emit('player time', (time));
        
    });
    index++;
});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
