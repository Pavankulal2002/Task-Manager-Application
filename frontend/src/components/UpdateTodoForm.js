import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


const customStyles = {
  content: {
    top: '60%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root')
const UpdateTodoForm = ({ task, userEmail, fetchData }) => {
  const correctDate = new Date(task.Duedate).toISOString().split('T')[0];

  const [taskTitle, setTitle] = useState(task.Title);
  const [taskDescription, setDescription] = useState(task.Description);
  const [taskDuedate, setDuedate] = useState(correctDate);

  const oldTitle = task.Title;
  const oldDescription = task.Description;
  const oldDuedate = correctDate;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const updatedTask = {}

    if (oldTitle != taskTitle) {
      updatedTask["Title"] = taskTitle;
    }
    if (oldDescription != taskDescription) {
      updatedTask["Description"] = taskDescription;
    }
    if (oldDuedate != taskDuedate) {
      updatedTask["Duedate"] = taskDuedate;
    }

    console.log(updatedTask);
    const url = 'http://localhost:8000/task/patch/' + userEmail + '?id=' + task._id;
    const patchResponse = await axios.patch(url, updatedTask);
    console.log(patchResponse.status);
    // Close the form after submission
    console.log('form Submitted')
    closeModal();
    fetchData();
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div >
      <button className="update-btn" onClick={openModal}>
  <FontAwesomeIcon icon={faEdit} />
</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Todo Modal"
      >
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={closeModal}
        ><span aria-hidden="true">&times;</span>
        </button>
        <h2 >Update Todo</h2>

        <div>Update your details here</div>
        <form className='create-todo-form' onSubmit={(e) => handleFormSubmit(e)}>
          <label htmlFor="Todo-title">Title :  </label>
          <input type="text" name="Todo-title" id="Todo-title" value={taskTitle} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="Todo-description">Description :  </label>
          <input type="text" name="Todo-description" id="Todo-description" value={taskDescription} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="due-date">Due date :  </label>
          <input type="date" name="due-date" id="due-date" value={taskDuedate} onChange={(e) => setDuedate(e.target.value)} />
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default UpdateTodoForm;