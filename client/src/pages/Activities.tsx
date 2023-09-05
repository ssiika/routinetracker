import React, { useEffect } from 'react'
import {useSelector} from 'react-redux';
import type { RootState } from '../app/store';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../app/hooks';
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner';
import ActivityForm from '../components/ActivityForm'
import ActivityBox from '../components/ActivityBox';
import { getActivities, activityReset } from '../features/activities/activitySlice'

function Activities() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {userActivityList, isLoading: activityLoading} = useSelector((state: RootState) => state.activities);
  const {user, isLoading: userLoading} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getActivities())

    return () => {
      dispatch(activityReset())
    }
  }, [user, dispatch, navigate])

  if (userLoading || activityLoading) {
    return <Spinner />
  }

  return (
    <>
        <Sidebar />
        <div className='content'>
          <div className="activityList">
          {userActivityList.map((activity) => {
            return (
              <ActivityBox activity={activity} />
            )
          })}
          </div>
          <ActivityForm />
        </div>
    </>   
  )
}

export default Activities