import React from 'react';
import UpdateTodoForm, { openModal } from './UpdateTodoForm'

const Todo = () => {
  return (
    <div className="todo">
      <div className="todo-content">
        <h2>Todo Name</h2>
        <p>Todo Description</p>
      </div>
      <div className="todo-options">
        <UpdateTodoForm></UpdateTodoForm>
        <button className='delete-btn'>Delete</button>
        <div>
          <label htmlFor="update-status">Status:</label>
          <select className="status-dropdown">
            <option value="To Do">To Do</option>
            <option value="In progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
    </div>
  );

};

export default Todo;
