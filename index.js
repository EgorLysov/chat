var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket=>{
    let name = 'U' + (socket.id).toString().substr(1,4);
    socket.broadcast.emit('newUser', name);
    socket.on('message', msg=>{
    let message = name +': ' +msg;
    io.emit('message', message);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
