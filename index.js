"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var users = {};

var i;
var index = 0;

io.on('connection', (socket) => {
    console.log("A user Connected");

    
    users[index] = socket.id;

    console.log("Kullanıcı Listesi");
    for(i=0;i<=index;i++){
        console.log(index+1+".Kullanıcı: "+users[i]);
    }
    socket.on('event message', (msg) => {
        if(socket.id==users[0])  
            socket.broadcast.emit('event message', msg);
            
    });
      
    socket.on('player time', (time) => {
      if(socket.id==users[0]) 
          socket.broadcast.emit('player time',time);
        
        console.log("Gönderilen Zaman: "+time);
        
    });
    index++;
});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
