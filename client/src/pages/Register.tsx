import React, { SyntheticEvent } from 'react'
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {FaUser} from 'react-icons/fa';
import type { RootState } from '../app/store.js';
import  {register, reset} from '../features/auth/authSlice';
import { useAppDispatch } from '../app/hooks';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    pwConfirm: '',
  })

  const [localError, setLocalError] = useState('');

  const { username, password, pwConfirm } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user, isLoading, isSuccess, message} = useSelector(
    (state: RootState) => state.auth
  )
  
  useEffect(() => {

    if (isSuccess || Object.keys(user).length !== 0) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isSuccess, navigate, dispatch])

  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (password !== pwConfirm) {
      setLocalError('Passwords do not match')
    } else {
      setLocalError('')
      // Register user
      const userData = {
        username: username.trim(),
        password: password.trim(),
      }

      dispatch(register(userData));
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='registerContent'>
      <section className="heading">
        <h1 className='registerHeader'>
          <FaUser /> Register
        </h1>
      </section>
      <section className="form">
        <form className="registerForm" onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" 
            className='form-control'
            id='username' 
            name='username' 
            value={username} 
            placeholder='Username'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" 
            className='form-control'
            id='password' 
            name='password' 
            value={password} 
            placeholder='Password'
            onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" 
            className='form-control'
            id='pwConfirm' 
            name='pwConfirm' 
            value={pwConfirm} 
            placeholder='Confirm password'
            onChange={onChange} />
          </div>
          <div className="errorbox">{localError ? localError : message}</div>
          <div className="form-group">
            <button type='submit' className='registerBtn'>
              Submit
            </button>
          </div>
          
        </form>
      </section>
    </div>
  )
}

export default Register