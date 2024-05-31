import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from './firebase'
import { toast } from 'react-toastify'
import '../index.css'

function ForgotPassword() {
  // State variable to store the email input field value
  const [email, setEmail] = useState('')

  // Function to handle form submission
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // Send a password reset email to the provided email address
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Display a success toast message and redirect to the login page
          toast.success(
            'Reset mail sent successfully. Please check your mail',
            {
              position: 'top-center'
            }
          )
          window.location.href = '/login'
        })

        .catch(error => {
          // Handle any errors that occur during the password reset process
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorMessage)
          console.log(errorCode)
        })
    } catch (error) {
      console.log(error.message)
      // Display an error toast message
      toast.error(error.message, {
        position: 'bottom-center'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Reset Password</h3>

      <div className='mb-3'>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='d-grid'>
        <button type='submit' className='btn btn-primary'>
          Reset Password
        </button>
      </div>

      <p className='forgot-password text-right'>
        Know the password? <a href='/login'>Login</a>
      </p>
    </form>
  )
}

export default ForgotPassword
