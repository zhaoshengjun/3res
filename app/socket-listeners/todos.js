import io from 'socket.io-client';
const socket = io.connect('/');

export default (store) => {
  socket.on('todo:insert', (todo) => {
    store.dispatch({
      type:'todo:insert',
      todo: todo
    })
  });
  socket.on('todo:update', (todo) => {
    store.dispatch({
      type:'todo:update',
      todo: todo
    })
  });
  socket.on('todo:delete', (todo) => {
    store.dispatch({
      type:'todo:delete',
      todo: todo
    })
  });

  
}