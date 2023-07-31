import React from 'react'
import { Record, Activity } from '../types'
import CalendarNode from './CalendarNode'


function Calendar({records, calendarClick, activityData}: {records: Record[], calendarClick: Function, activityData: Activity}) {
    const start = activityData.start
    const formattedStart = new Date(start).getTime()
    var today = new Date().getTime()
    

    const addDays = function(date: Date, days: number) {
        date.setDate(date.getDate() + days);
        return date;
    }

    
    // calendarStart returns either a date 30 days ago, or if the activity was created within 30 days the date of creation
    var calendarStart: Date = new Date(today - Math.min((today - formattedStart), (24*60*60*1000) * 30))
    var recentRecords = records.filter((record) => new Date(record.day).getTime() >= calendarStart.getTime())
    var largestTimeValue = Math.max(...recentRecords.map(x => x.time))
    
    // ISSUE: need to turn record.day into Date not string
  return ( 
        <div className="calendarBox">
            {(function (start: Date, end: Date) {
                let calendarArray = []
                while (start.toLocaleDateString() !== end.toLocaleDateString()) {

                    // Check if there is a record in recent records matching the relevant date

                    let foundRecord;
                
                    // Record data is an object in a format ready to be sent to the update record form 
                    
                    let recordData;

                    for (let i = 0; i < recentRecords.length; i++) {
                        const date = new Date(recentRecords[i].day).toLocaleDateString()
                        if (date === start.toLocaleDateString()) {
                            foundRecord = recentRecords.splice(i, 1)
                            recordData = {
                                id: foundRecord[0]._id,
                                activity_id: activityData._id,
                                activity_name: activityData.name,
                                date: start.toLocaleDateString()
                            }
                            calendarArray.push(<CalendarNode  recordData={recordData} time={foundRecord[0].time} max={largestTimeValue} calendarClick={calendarClick}/>)
                            break;
                        }
                    }

                    if (!foundRecord) {
                        recordData = {
                            activity_id: activityData._id,
                            activity_name: activityData.name,
                            date: start.toLocaleDateString()
                        }
                        calendarArray.push(<CalendarNode recordData={recordData} time={0} max={largestTimeValue} calendarClick={calendarClick}/>)
                    }

                    addDays(start, 1)
                }
                return calendarArray
            })(calendarStart, new Date())}
        </div>
    )
}


export default Calendar