import React from 'react';
import axios from 'axios';
import { Trash } from 'react-bootstrap-icons';
import UpdateTodoForm from './UpdateTodoForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

const Todo = ({ todo, userEmail, fetchData }) => {
  const getStatusStyle = () => {
    switch (todo.Status) {
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

  async function handleTaskDelete() {
    const url = `http://localhost:8000/task/delete/${userEmail}?id=${todo._id}`;
    const deleteResponse = await axios.delete(url);
    console.log(deleteResponse.status);
    fetchData();
  }

  async function handleStatusChange(e) {
    console.log(e.target.value);
    const newStatus = e.target.value;
    const url = `http://localhost:8000/task/patch/${userEmail}?id=${todo._id}`;
    const patchResponse = await axios.patch(url, {
      Status: newStatus,
    });
    console.log(patchResponse.status);
    fetchData();
  }

  return (
    <div className="todo" style={getStatusStyle()}>
      <table>
        <tbody>
          <tr>
            <td>
              <div className="todo-content">
                <h2>{todo.Title}</h2>
                <p>{todo.Description}</p>
                <p>{todo.Duedate}</p>
              </div>
            </td>
            <td>
              <div className="todo-options">
                <UpdateTodoForm todo={todo} />
                <button className="delete-btn" onClick={handleTaskDelete}>
                <FontAwesomeIcon icon={faTrash}/> {/* Use the Trash icon from 'react-bootstrap-icons' */}
                </button>
                <div>
                  {/* <label htmlFor="update-status">Status:</label> */}
                  <select
                    className="status-dropdown"
                    defaultValue={todo.Status}
                    onChange={handleStatusChange}
                  >
                    <option value="Todo">To Do</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
