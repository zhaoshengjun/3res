import React from 'react';
import AppBar from 'material-ui/AppBar';
import TodoList from './todoList.jsx';
import AddTodo from './addTodo.jsx';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar title="Todo" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <TodoList todos={this.props.todos} />
        <AddTodo />
      </div>
    )
  }
}

function mapStateToProps(todos) {
  return {todos}
}

export default connect(mapStateToProps)(App);
