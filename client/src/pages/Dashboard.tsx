import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import type { RootState } from '../app/store';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
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