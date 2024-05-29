import React, { useState } from 'react';
import CreateTodoForm from './CreateTodoForm';
import Popup from 'reactjs-popup';

const CreateTodoButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div className="create-todo-button">
      <div><CreateTodoForm id='create-todo-form' /></div>
    </div>
  );
};

export default CreateTodoButton;
