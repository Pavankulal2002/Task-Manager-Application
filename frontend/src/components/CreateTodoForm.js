import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from "axios"
import ReactDOM from 'react-dom';

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
const CreateTodoForm = ({ user, fetchData }) => {
  const [taskTitle, setTitle] = useState('');
  const [taskDescription, setDescription] = useState('');
  const [taskDuedate, setDuedate] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const taskStatus = "Todo";

    // const csrfRes = await axios.get('http://localhost:8000/task/getCSRF');
    // console.log(csrfRes.data.data.csrfToken);
    // const csrfTokenVar = csrfRes.data.data.csrfToken;

    const userEmail = user?.email;
    console.log(userEmail);
    const url = 'http://localhost:8000/task/post/'+userEmail;

    fetch(url, { // Your API endpoint
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Ensure proper content type
      },
      body: JSON.stringify({
        Title: taskTitle,
        Description: taskDescription,
        Status: taskStatus,
        Duedate: taskDuedate
      })
    })
    .then((res)=>{
      console.log(res);
    })
    .catch(error => console.error('Error:', error));
    // Close the form after submission
    console.log('form Submitted')
    fetchData();
    closeModal();
  };


  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Create Todo</button>
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
        <h2 >Create Todo</h2>

        <div>Enter your details here</div>
        <form className='create-todo-form' onSubmit={ handleFormSubmit }>
          <label htmlFor="Todo-title">Title :  </label>
          <input type="text" name="Todo-title" id="Todo-title" onChange={(e)=> setTitle(e.target.value)} />
          <label htmlFor="Todo-description">Description :  </label>
          <input type="text" name="Todo-description" id="Todo-description" onChange={(e)=> setDescription(e.target.value)} />
          <label htmlFor="due-date">Due date :  </label>
          <input type="date" name="due-date" id="due-date" onChange={(e)=> setDuedate(e.target.value)} />
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default CreateTodoForm;
