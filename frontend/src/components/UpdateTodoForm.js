import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


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
const UpdateTodoForm = ({ close }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // ...
    // Close the form after submission
    console.log('form Submitted')
    close();
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
        <form className='create-todo-form'>
          <label htmlFor="Todo-title">Title :  </label>
          <input type="text" name="Todo-title" id="Todo-title" />
          <label htmlFor="Todo-description">Description :  </label>
          <input type="text" name="Todo-description" id="Todo-description" />
          <label htmlFor="due-date">Due date :  </label>
          <input type="date" name="due-date" id="due-date" />
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default UpdateTodoForm;
