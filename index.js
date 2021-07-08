"use strict";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/deneme.html');
});

io.on('connection', (socket) => {
  console.log("A user Connected");
  socket.on('chat message', (msg) => {
    socket.broadcast.emit(msg);  
    
    
    
  });
  
});

// client-side




http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
