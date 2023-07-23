import React from 'react'
import { Record } from '../types'


function Calendar({start, records}: {start: Date, records: Record[]}) {
    const formattedStart = new Date(start).getTime()
    var today = new Date().getTime()


    // ISSUE: does not return record made on day of activity creation
    
    // calendarEnd returns either a period of 30 days, or if the activity was created within 30 days the number of days since then 
    var calendarEnd = Math.min((today - formattedStart), (24*60*60*1000) * 30)
    var recentRecords = records.filter((record) => new Date(record.day).getTime() >= (today - calendarEnd))
  return ( 
    <>
        {recentRecords.map((record) => 
            <div>{start.toString()}, {new Date().toString()}, {record.day.toString()},  {record.time}</div>
        )}
    </>
    )
}
// Loop with smallest value between 30 days and time between start and now
export default Calendar