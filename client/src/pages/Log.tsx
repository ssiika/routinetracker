import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar'
import {useSelector} from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import type { RootState } from '../app/store';
import { getRecords, recordReset } from '../features/records/recordSlice';
import { getActivities, activityReset } from '../features/activities/activitySlice'

function Log() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useSelector((state: RootState) => state.auth);
  const {userRecordList} = useSelector((state: RootState) => state.records)
  const {userActivityList} = useSelector((state: RootState) => state.activities);


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
  }, [user])

  return (
    <>
        <Sidebar />
        <div className='log-content'>
          <div className='log-title'>Log time spent in your activities</div>
            <div className='log-activities'>
              {userActivityList.length > 0 ? (
                <>
                  {userActivityList.map(function(activity) {
                    const activityRecords = userRecordList.filter((record) => 
                      record.activity_id === activity._id
                      )
                      return (
                      <div className="activitybox">
                            <div className="activityHeader" key={activity._id}>{activity.name}</div>
                              <Calendar start={activity.start} records={activityRecords}/>
                            </div>
                      )})}
                </>
              ) : (
                <h3>You have no activities yet</h3>
              )}
          </div>
        </div>
        
    </>
  )
}

export default Log