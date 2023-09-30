import React, { SyntheticEvent } from 'react'
import { useState, useEffect } from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import type { RootState } from '../app/store';
import {login, reset} from '../features/auth/authSlice';
import { useAppDispatch } from '../app/hooks';
import Spinner  from '../components/Spinner';
import { activityReset } from '../features/activities/activitySlice';
import { recordReset } from '../features/records/recordSlice';


function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user, isLoading, isSuccess, message} = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (isSuccess || (user && Object.keys(user).length !== 0)) {
      navigate('/')
    }
    
    dispatch(reset())
    dispatch(activityReset())
    dispatch(recordReset())

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

    const userData = {
      username: username.trim(),
      password: password.trim(),
    }

    dispatch(login(userData));
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='loginContent'>
      <section className="heading">
        <h1 className='loginHeader'>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit} className='loginForm'>
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
          <div className="errorbox">{message}</div>
          <div className="form-group">
            <button type='submit' className='loginBtn'>
              Submit
            </button>
          </div>
          
        </form>
      </section>
    </div>
  )
}

export default Login