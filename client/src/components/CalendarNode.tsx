import React, {useState } from 'react'

function CalendarNode({date, time, max}: {date: string, time: number, max: number}) {
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
      <span className={hover ? "calendarHover" : ""}>{hover ? `${time} minutes on ${date}` : ''}</span>
    </div> 
  )
}
export default CalendarNode