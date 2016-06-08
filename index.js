var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(server);
var r = require('rethinkdb');
var changefeedSocketEvents = require('./socket-events.js');

app.use(express.static('public'));

app.get('*',(req, res)=> {
  res.sendFile(path.join(__dirname +'/index.html'));
} );

r.connect({
  db: '3RES_Todo'
})
.then((connection) => {
  io.on('connection', (socket) => {

    socket.on('todo:client:insert', (todo) =>{
      r.table('Todo').insert(todo).run(connection);
    });

    socket.on('todo:client:update', (todo) =>{
      var id = todo.id;
      delete todo.id;
      r.table('Todo').get(id).update(todo).run(connection);
    });

    socket.on('todo:client:delete', (todo) =>{
      var id = todo.id;
      delete todo.id;
      r.table('Todo').get(id).delete().run(connection);
    });

    r.table('Todo').changes({
      includeInitial: true,
      squash: true
    }).run(connection)
    .then(changefeedSocketEvents(socket, 'todo'));

  });

  server.listen(9000);
})
.error((error)=>{
  console.log('Error connecting to database');
  console.log(error);
})