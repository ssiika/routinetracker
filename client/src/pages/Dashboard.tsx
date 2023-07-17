import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import type { RootState } from '../app/store';
import { RootQuerySelector } from 'mongoose';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <Sidebar />
       <div className='content'>Dashboard</div>
    </>
   
  )
}

export default Dashboard