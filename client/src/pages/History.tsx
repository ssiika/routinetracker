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

  interface MonthGroupOutput {
    year: number,
    // Month should be month array index
    month: number,
    total: number,
  }
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useSelector((state: RootState) => state.auth);
  const {userRecordList, isLoading: recordLoading} = useSelector((state: RootState) => state.records)
  const {userActivityList, isLoading: activityLoading} = useSelector((state: RootState) => state.activities);

  const months: [string, number][] = [['Jan', 31], ['Feb', 28], ['Mar', 31], ['Apr', 30], ['May', 31], ['Jun', 30], 
  ['Jul', 31], ['Aug', 31], ['Sep', 30], ['Oct', 31], ['Nov', 30], ['Dec', 31]]

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

  const getValuesFromDate = (date: Date | string): {year: number, month: number} => {
    // Sanitise dates
    if (date instanceof Date) {
      date = date.toLocaleDateString();
    }

    const year = parseInt(date.slice(0, 4))
    const month = parseInt(date.slice(5, 7))
    return {year, month};
  }

  const groupByMonth = (array: Record[]): MonthGroupOutput[] => {
    
    let outputArray: MonthGroupOutput[] = [];

    // Loop through array, check if output contains relevant year and month, if not create new item to push to array
    for (let i = 0; i < array.length; i++) {
      const {year, month} = getValuesFromDate(array[i].day)
      const groupExists = outputArray.findIndex((obj) => (obj.year === year) && (obj.month === month))
      if (groupExists < 0) {
        // Entry doesn't exist yet. Need to create new one
        outputArray.push({
          year,
          month,
          total: array[i].time
        })
      } else {
        // Entry already exists. Must append time to total
        outputArray[groupExists] = {
          ...outputArray[groupExists],
          total: outputArray[groupExists].total + array[i].time
        }
      }
    }
    

    return outputArray;
 
  }

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
                  const sortedArray = groupByMonth(defaultArray)
                  sortedArray.map((group) => {
                    // Average to 2 decimal places
                    const avg = Math.round((group.total / months[group.month][1])* 100) / 100
                    recordArray.push(
                      <div key={`${group.year}-${group.month}`}>{`${group.year}-${months[group.month][0]}: total ${group.total} average ${avg} minutes`}</div>
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