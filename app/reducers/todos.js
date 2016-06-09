const todos = (state = [], action) => {
  const todoIndex = () => {
    return state.findIndex( todo => {
      return todo && todo.id === action.todo.id
    });
  }

  switch(action.type) {
    case 'todo:insert':
      return todoIndex() < 0 ? [...state, action.todo] :state;
    case 'todo:update':
      var index = todoIndex();
      if (index > -1) {
        var updateTodo = Object.assign({}, state[index], action.todo);
        return [...state.slice(0, index), updateTodo, ...state.slice(index + 1)]
      } else {
        return state;
      }

    case "todo:delete": 
      var index = todoIndex();
      if (index > -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      } else {
        return state;
      }
    default: 
      return state;
  }
}

export default todos;