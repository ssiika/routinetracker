import React, {useState } from 'react'
import { RecordUpdateData } from '../types';

function CalendarNode({recordData, time, max, calendarClick, color}: {
  recordData: RecordUpdateData, 
  time: number, 
  max: number, 
  calendarClick: Function,
  color: string
  }) {

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true)
  }

  const onLeave = () => {
    setHover(false);
  }

  const nodeFilterStyle = {
    backgroundColor: `rgb(${color}, ${time / max})`
  }

  if (recordData.day instanceof Date) {
    
  }
  

  return (
    <div style={nodeFilterStyle} onMouseEnter={onHover} onMouseLeave={onLeave} onClick={() => calendarClick(recordData)} className="calendarNode">
      <span className={hover ? "calendarHover" : ""}>
        {hover ? `${time} minutes on 
        ${(recordData.day instanceof Date) ? recordData.day.toLocaleDateString() : recordData.day}` : ''}
      </span>
    </div> 
  )
}
export default CalendarNode