import React from 'react'
import Sidebar from '../components/Sidebar'
import TimeslotForm from '../components/TimeslotForm'
import ScheduleOverlay from '../components/ScheduleOverlay'
import {useSelector} from 'react-redux';
import type { RootState } from '../app/store';
import ActivityForm from '../components/ActivityForm';

function Schedule() {
  const {userActivityList} = useSelector((state: RootState) => state.activities);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const times = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am']
  
  return (
    <>
        <Sidebar />
        <div className='content'>
          <div className="schedule">
            <div className="timeLegend">
              {times.map((time, index) => {
                return (
                  <div className="timeLegendBox" key={index}>{time}</div>
                )
              })}
            </div>
            <ScheduleOverlay />
            {days.map((day, index) => {
              return (
              <div className="dayBox" key={`dayBox-${index}`}>
                <table className='dayTable'>
                  <thead>
                  </thead>
                  <tbody>
                    {(function () {
                    let tableArray = [];
                    for (let i = 0; i < 48; i++) {
                      tableArray.push(
                        <tr key={`tableCell-${i}`}>
                          <td id={`${index}-${i}`} className='timeslot'></td>
                        </tr>
                      )
                    }
                    return tableArray
                    })()
                    }
                  </tbody>
                </table>
                <div className="day">
                  {day}
                </div>
              </div>
            )
          })}
          </div>
          <div className="activityLegend">
            {userActivityList.map((activity, index) => {
              return (
                <div className="legendBox" key={`activityLegend-${index}`}>
                  <div className="colorBox" style={{backgroundColor: `rgb(${activity.color})`}}></div>
                  <div className="legendName">{activity.name}</div>
                </div>
                
              )
            })}
          </div>
          <TimeslotForm />
        </div>
    </>
  )
}

export default Schedule