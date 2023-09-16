import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';
import RecordForm from '../components/RecordForm';
import Spinner from '../components/Spinner';
import NoActivities from '../components/NoActivities';
import {useSelector} from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import type { RootState } from '../app/store';
import { getRecords, recordReset } from '../features/records/recordSlice';
import { getActivities, activityReset } from '../features/activities/activitySlice'
import { RecordUpdateData } from '../types'

function Log() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user, isLoading: userLoading} = useSelector((state: RootState) => state.auth);
  const {userRecordList} = useSelector((state: RootState) => state.records)
  const {userActivityList, isLoading: activityLoading} = useSelector((state: RootState) => state.activities);
  const { isLoading: recordLoading, isError} = useSelector((state: RootState) => state.records);

  const [recordData, setRecordData] = useState<RecordUpdateData | null>(null);
  const [popupOpen, setPopupOpen] = useState(false)

  const resetPopupOpen = () => {
    setPopupOpen(false)
  }

  const calendarClick = (data: RecordUpdateData) => {
    return setRecordData(data)
  }


  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      navigate('/login')
    }

    dispatch(getRecords())
    dispatch(getActivities())

    return () => {
      dispatch(recordReset())
      dispatch(activityReset())
    }
  }, [user, dispatch, navigate])

  useEffect(() => {
    if(isError) {
      setPopupOpen(true)
    }
  }, [isError])

  if (userLoading || activityLoading || recordLoading) {
    return <Spinner />
  }

  if (userActivityList.length === 0) {
    return <NoActivities />
  }

  return (
    <>
        <Sidebar />
        <div className='content'>
          <div className='logDesc'>
            {recordData ? `${recordData.activity_name} on 
            ${(recordData.day instanceof Date) ? recordData.day.toLocaleDateString() : recordData.day}` : 
            'Click on a day to add a record'}
          </div>
          <button 
            className={recordData ? 'addBtn' : 'addBtn disabled'}
            disabled={!recordData ? true: false}
            onClick={() => setPopupOpen(true)}
          >Add a Record</button>
          {popupOpen && 
          <RecordForm 
            record={recordData}
            resetPopupOpen={resetPopupOpen}
          />}
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