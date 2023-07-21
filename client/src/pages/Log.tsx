import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import {useSelector} from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import type { RootState } from '../app/store';
import { getRecords, recordReset } from '../features/records/recordSlice';
import { getActivities, activityReset } from '../features/activities/activitySlice'

function Log() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getRecords())
    dispatch(getActivities())

    return () => {
      dispatch(recordReset())
      dispatch(activityReset())
    }
  })
  return (
    <>
        <Sidebar />
        <div className='content'>Log time spent in your activities</div>
    </>
  )
}

export default Log