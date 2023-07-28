import React, {useState } from 'react'
import { RecordUpdateData } from '../types';

function CalendarNode({recordData, time, max}: {recordData: RecordUpdateData, time: number, max: number}) {
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
    <div style={nodeFilterStyle} onMouseEnter={onHover} onMouseLeave={onLeave} className="calendarNode">
      <span className={hover ? "calendarHover" : ""}>{hover ? `${time} minutes on ${recordData.date}` : ''}</span>
    </div> 
  )
}
export default CalendarNode