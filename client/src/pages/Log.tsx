import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';
import RecordForm from '../components/RecordForm';
import {useSelector} from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import type { RootState } from '../app/store';
import { getRecords, recordReset } from '../features/records/recordSlice';
import { getActivities, activityReset } from '../features/activities/activitySlice'
import { RecordUpdateData } from '../types'

function Log() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useSelector((state: RootState) => state.auth);
  const {userRecordList} = useSelector((state: RootState) => state.records)
  const {userActivityList} = useSelector((state: RootState) => state.activities);

  const [recordData, setRecordData] = useState<RecordUpdateData | null>(null);

  const calendarClick = (data: RecordUpdateData) => {
    return setRecordData(data)
  }


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
  }, [user, dispatch, navigate])

  return (
    <>
        <Sidebar />
        <div className='content'>
          <div className='log-title'>Log time spent in your activities</div>
            <RecordForm record={recordData} />
            <div className='log-activities'>
              {userActivityList.length > 0 ? (
                <>
                  {userActivityList.map(function(activity, index) {
                    const activityRecords = userRecordList.filter((record) => 
                      record.activity_id === activity._id
                      )
                      return (
                      <div 
                        className="activitybox" 
                        style={{border: `3px solid rgb(${activity.color})`}}
                        key={`logBox-${index}`}
                      >
                            <div className="activityHeader" key={activity._id}>{activity.name}</div>
                              <Calendar records={activityRecords} calendarClick={calendarClick} activityData={activity} />
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