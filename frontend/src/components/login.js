import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from './firebase'
import { toast } from 'react-toastify'
import SignInwithGoogle from './signInWIthGoogle'
import '../index.css'

function Login () {
  // State variables to store the email and password input fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Function to handle form submission
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // Sign in the user with the provided email and password
      await signInWithEmailAndPassword(auth, email, password)
      // Redirect the user to the profile page upon successful login
      window.location.href = '/profile'
      // Display a success toast message
      toast.success('User logged in Successfully', {
        position: 'top-center'
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
      <h3>Login</h3>

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

      <div className='mb-3'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          placeholder='Enter password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <div className='d-grid'>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </div>
      <div className='forgot-password-container'>
        <p className='forgot-password text-left'>
          <a href='/forgotPassword'>Forgot Password?</a>
        </p>
        <p className='forgot-password text-right'>
          New user <a href='/register'>Register Here</a>
        </p>
      </div>
      <SignInwithGoogle />
    </form>
  )
}

export default Login
