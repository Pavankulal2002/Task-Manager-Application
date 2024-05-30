import React from 'react';
import UpdateTodoForm, { openModal } from './UpdateTodoForm';

const Todo = ({todo}) => {

  const getStatusStyle = () => {
    switch(todo.Status) {
      case 'Todo':
        return { backgroundColor: '#FFCCCC' };
      case 'InProgress':
        return { backgroundColor: '#FFFFCC' };
      case 'Done':
        return { backgroundColor: '#CCFFCC' };
      default:
        return {};
    }
  };
  
  return (
    <div className="todo" style={getStatusStyle()}>
        <div key={todo._id} className="todo-item">
          <div className="todo-content">
            <h2>{todo.Title}</h2>
            <p>{todo.Description}</p>
          </div>
          <div className="todo-options">
            <UpdateTodoForm todo={todo} />
            <button className="delete-btn">Delete</button>
            <div>
              <label htmlFor="update-status">Status:</label>
              <select className="status-dropdown" defaultValue={todo.Status}>
                <option value="Todo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Todo;
