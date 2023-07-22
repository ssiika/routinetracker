import React from 'react'
import { Record } from '../types'


function Calendar({start, records}: {start: string, records: Record[]}) {
  return (
    <>
        {records.map((record) => 
            <div>{record.time}</div>
        )}
    </>
    )
}

export default Calendar