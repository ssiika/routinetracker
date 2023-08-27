import React, { SyntheticEvent, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import {useSelector} from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import { getRecords, recordReset } from '../features/records/recordSlice';
import { getActivities, activityReset } from '../features/activities/activitySlice';
import type { RootState } from '../app/store';
import Spinner from '../components/Spinner';
import { Record } from '../types';

function History() {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useSelector((state: RootState) => state.auth);
  const {userRecordList, isLoading: recordLoading} = useSelector((state: RootState) => state.records)
  const {userActivityList, isLoading: activityLoading} = useSelector((state: RootState) => state.activities);

  function sortCompare( a: Record, b: Record ) {
    if ( a.day < b.day ){
      return -1;
    }
    if ( a.day > b.day ){
      return 1;
    }
    return 0;
  }


  const [recordData, setRecordData] = useState<Record[] | null>(null)


  const onActivityChange = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string
    }

    const data = userRecordList.filter((record) => record.activity_id === target.value).sort(sortCompare)
    setRecordData(data)
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

  if (recordLoading || activityLoading) {
    return <Spinner />
  }

  return (
    <>
        <Sidebar />
        <div className='content'>
          <label htmlFor="histActSel">Select Activity: </label>
          <select name="histActSel" id="histActSel" onChange={(e) => onActivityChange(e)}>
            {userActivityList.map((activity, index) => {
              return (
                <option value={activity._id} key={`activityOption-${index}`}>{activity.name}</option>
              )
            })}
          </select>
          <div className="graph">
            {recordData && recordData.length !== 0 ? (
              <>
                {recordData.map((record) => {
                  return (
                    <div key={record._id}>{`${record.time} on ${record.day}`}</div>
                  )
                })}
              </>
              ) : 
              (<>
                {(function () {
                  let recordArray: JSX.Element[] = [];
                  const defaultArray = userRecordList.filter((record) => record.activity_id === userActivityList[0]?._id).sort(sortCompare)
                  defaultArray.map((record) => {
                    recordArray.push(
                      <div key={record._id}>{`${record.time} on ${record.day}`}</div>
                    )
                  })
                  return recordArray
                  })()
                } 
              </>
              )
            }
          </div>
        </div>
    </>
  )
}

export default History