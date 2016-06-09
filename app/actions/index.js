export const newTodo = (todo) => {
  return {
    type:'todo:new',
    todo: todo
  }
}
export const updateTodo = (todo) => {
  return {
    type:'todo:update',
    todo: todo
  }
}
export const deleteTodo = (todo) => {
  return {
    type:'todo:delete',
    todo: todo
  }
}