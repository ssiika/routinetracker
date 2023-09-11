import React, { SyntheticEvent, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import NoActivities from '../components/NoActivities';
import {useSelector} from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import { getRecords, recordReset } from '../features/records/recordSlice';
import { getActivities, activityReset } from '../features/activities/activitySlice';
import type { RootState } from '../app/store';
import Spinner from '../components/Spinner';
import Graph from '../components/Graph';
import { Record, Activity, GroupedData } from '../types';

function History() {

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
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString())
  const [yAxisFilter, setYAxisFilter] = useState('total')

  const getValuesFromDate = (date: Date | string): {year: number, month: number} => {
    // Sanitise dates
    if (date instanceof Date) {
      date = date.toLocaleDateString();
    }

    const year = parseInt(date.slice(0, 4))
    const month = parseInt(date.slice(5, 7))
    return {year, month};
  }

  const groupByMonth = (array: Record[]): GroupedData[] => {
    
    let outputArray: GroupedData[] = [];

    // Loop through array, check if output contains relevant year and month, if not create new item to push to array
    for (let i = 0; i < array.length; i++) {
      const {year, month} = getValuesFromDate(array[i].day)
      const groupExists = outputArray.findIndex((obj) => (obj.year === year) && (obj.month === month))
      if (groupExists < 0) {
        // Entry doesn't exist yet. Need to create new one
        outputArray.push({
          year,
          month,
          total: array[i].time,
          avg: Math.round(((array[i].time / months[month][1]) * 100) / 100)
        })
      } else {
        // Entry already exists. Must append time to total
        outputArray[groupExists] = {
          ...outputArray[groupExists],
          total: outputArray[groupExists].total + array[i].time,
          avg: Math.round((((outputArray[groupExists].total + array[i].time) / months[month][1]) * 100) / 100)
        }
      }
    }
    

    return outputArray;
 
  }

  const createYearSelectOptions = (start: Date | string): JSX.Element[] => {
    let outputArray: JSX.Element[] = [];
    if (start instanceof Date) {
      start = start.toLocaleDateString()
    }
    const startInt = parseInt(start.slice(0, 4))
    const currentYear = new Date().getFullYear()

    for (let i = currentYear; i >= startInt; i--) {
      outputArray.push(
        <option value={i} key={`yearOption-${i}`}>{i}</option>
      )
    } 

    return outputArray
  }

  const onYearChange = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string
    }

    setYearFilter(target.value)
  }

  const onYAxisChange = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string
    }

    setYAxisFilter(target.value)
  }

  const onActivityChange = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      value: string
    }

    const activity = userActivityList.find((activity) => activity._id === target.value)
    if (activity) {
      setSelectedActivity(activity)
    }

    const data = userRecordList.filter((record) => record.activity_id === target.value).sort(sortCompare)
    setRecordData(data)
    setYearFilter(new Date().getFullYear().toString())
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

  if (userActivityList.length === 0) {
    return <NoActivities />
  }

  return (
    <>
        <Sidebar />
        <div className='content'>
          <div className="filterBox">
            <select className="graphFilter" name="histActSel" id="histActSel" onChange={(e) => onActivityChange(e)}>
              {userActivityList.map((activity, index) => {
                return (
                  <option value={activity._id} key={`activityOption-${index}`}>{activity.name}</option>
                )
              })}
            </select>
            <select className="smallFilter graphFilter" name="yearSelect" id="yearSelect" onChange={(e) => onYearChange(e)}>
              {(function () {
                if (!selectedActivity) {
                  if (userActivityList.length !== 0) {

                    const optionsArray = createYearSelectOptions(userActivityList[0].start)
                    return optionsArray
                  }
                  return <></>
                }
                const optionsArray = createYearSelectOptions(selectedActivity.start)
                return optionsArray
                })()
              } 
            </select>
            <select className="graphFilter smallFilter" name="yAxisSelect" id="yAxisSelect" onChange={(e) => onYAxisChange(e)}>
              <option value="total">Total</option>
              <option value="avg">Daily Avg</option>
            </select>
          </div>        
          <div className="graph">
            {recordData ? (
              <>
                {(function () {
                    const sortedArray = groupByMonth(recordData)
                    return <Graph 
                      data={sortedArray.filter((data) => data.year === parseInt(yearFilter))}
                      color={selectedActivity?.color ? selectedActivity.color : '0, 0, 0'}
                      yAxisFilter={yAxisFilter}
                    />
                    })()
                } 
              </>
              ) : 
              (<>
                {(function () {
                  const defaultArray = userRecordList.filter((record) => record.activity_id === userActivityList[0]?._id).sort(sortCompare)
                  const sortedArray = groupByMonth(defaultArray)

                  let color: string;
                  if (selectedActivity) {
                    color = selectedActivity.color
                  } else if (userActivityList.length !== 0) {
                    color = userActivityList[0].color
                  } else {
                    color = '0, 0, 0'
                  }

                  return <Graph 
                    data={sortedArray.filter((data) => data.year === parseInt(yearFilter))}
                    color={color}
                    yAxisFilter={yAxisFilter}
                  />
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