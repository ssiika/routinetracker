import React from 'react'
import Sidebar from '../components/Sidebar'

function Schedule() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return (
    <>
        <Sidebar />
        <div className='content'>
          <div className="schedule">
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
                          <td id={`${index}-${0}`} className='timeslot'></td>
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
        </div>
    </>
  )
}

export default Schedule