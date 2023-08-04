import React, {useState } from 'react'
import { RecordUpdateData } from '../types';

function CalendarNode({recordData, time, max, calendarClick}: {
  recordData: RecordUpdateData, time: number, max: number, calendarClick: Function
  }) {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true)
  }

  const onLeave = () => {
    setHover(false);
  }

  const nodeFilterStyle = {
    backgroundColor: `rgb(54, 143, 54, ${time / max})`
  }
  
  return (
    <div style={nodeFilterStyle} onMouseEnter={onHover} onMouseLeave={onLeave} onClick={() => calendarClick(recordData)} className="calendarNode">
      <span className={hover ? "calendarHover" : ""}>{hover ? `${time} minutes on ${recordData.day}` : ''}</span>
    </div> 
  )
}
export default CalendarNode