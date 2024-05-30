import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

const customStyles = {
  content: {
    top: '60%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')
const CreateTodoForm = ({ user, fetchData }) => {
  // State variables to store the input values
  const [taskTitle, setTitle] = useState('')
  const [taskDescription, setDescription] = useState('')
  const [taskDuedate, setDuedate] = useState('')

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission logic here
    const taskStatus = 'Todo'
    // Get CSRF token
    const csrfResponse = await axios.get('http://localhost:8000/task/getCSRF')
    const csrfTokenVar = csrfResponse.data['data'].csrfToken

    const userEmail = user?.email
    console.log(userEmail)
    const url = 'http://localhost:8000/task/post/' + userEmail

    fetch(url, {
      // API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Ensure proper content type
      },
      body: JSON.stringify({
        Title: taskTitle,
        Description: taskDescription,
        Status: taskStatus,
        Duedate: taskDuedate,
        _csrf: csrfTokenVar
      })
    })
      .then(res => {
        console.log(res)
      })
      .catch(error => console.error('Error:', error))
    // Close the form after submission
    console.log('form Submitted')
    fetchData()
    closeModal()
  }

  // State variable to control the modal
  const [modalIsOpen, setIsOpen] = React.useState(false)
  // Function to open the modal
  function openModal() {
    setIsOpen(true)
  }
  // Function to close the modal
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>Create Todo</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Create Todo Modal'
      >
        <button
          type='button'
          className='close'
          data-dismiss='modal'
          aria-label='Close'
          onClick={closeModal}
        >
          <span aria-hidden='true'>&times;</span>
        </button>
        <h2>Create Todo</h2>

        <div>Enter your details here</div>
        <form className='create-todo-form' onSubmit={handleFormSubmit}>
          <label htmlFor='Todo-title'>Title : </label>
          <input
            type='text'
            name='Todo-title'
            id='Todo-title'
            onChange={e => setTitle(e.target.value)}
            required
          />
          <label htmlFor='Todo-description'>Description : </label>
          <input
            type='text'
            name='Todo-description'
            id='Todo-description'
            onChange={e => setDescription(e.target.value)}
            required
          />
          <label htmlFor='due-date'>Due date : </label>
          <input
            type='date'
            name='due-date'
            id='due-date'
            onChange={e => setDuedate(e.target.value)}
            required
          />
          <input type='submit' value='Submit' />
        </form>
      </Modal>
    </div>
  )
}

export default CreateTodoForm
