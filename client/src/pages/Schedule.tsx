import React from 'react'
import Sidebar from '../components/Sidebar'
import TimeslotForm from '../components/TimeslotForm'
import ScheduleOverlay from '../components/ScheduleOverlay'

function Schedule() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const times = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am']
  return (
    <>
        <Sidebar />
        <div className='content'>
          <div className="schedule">
            <div className="timeLegend">
              {times.map((time) => {
                return (
                  <div className="timeLegendBox">{time}</div>
                )
              })}
            </div>
            <ScheduleOverlay />
            {days.map((day, index) => {
              return (
              <div className="dayBox">
                <table className='dayTable'>
                  <thead>
                  </thead>
                  <tbody>
                    {(function () {
                    let tableArray = [];
                    for (let i = 0; i < 48; i++) {
                      tableArray.push(
                        <tr>
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
          <TimeslotForm />
        </div>
    </>
  )
}

export default Schedule