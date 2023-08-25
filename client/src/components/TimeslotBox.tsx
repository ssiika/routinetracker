import React, { useState } from 'react'
import { Timeslot, Activity } from '../types'
import { useAppDispatch } from '../app/hooks';
import { start } from 'repl';
import { deleteTimeslot } from '../features/activities/activitySlice';

function TimeslotBox({timeslot, activity}: {timeslot: Timeslot, activity: Activity}) {
    const dispatch = useAppDispatch();
    const [hover, setHover] = useState(false);

    const calculateValues = (start: string, end: string): { startDiv: number, divSpan: number } => {
        const startDiv = (parseInt(start.slice(0, 2)) * 2) + (parseInt(start.slice(-2)) / 30)
        const endDiv = (parseInt(end.slice(0, 2)) * 2) + (parseInt(end.slice(-2)) / 30)
        const divSpan = endDiv - startDiv

        return {
            startDiv,
            divSpan
        }
    }

    const { startDiv, divSpan } = calculateValues(timeslot.startTime, timeslot.endTime)
    
    const style = { 
        top: `${(startDiv * 12) + 2}px`, 
        left: `${parseInt(timeslot.day) * 150 + 2}px`,
        height: `${divSpan * 12}px`, 
        backgroundColor: `rgb(${activity.color}, 0.8)`    
    }

    const onHover = () => {
        setHover(true)
    }

    const onLeave = () => {
        setHover(false);
    }

    const handleDeleteClick = () => {
        dispatch(deleteTimeslot(`${activity._id}-${timeslot._id}`))
    }
    
    return (
            <div 
            style={style}  
            onMouseEnter={onHover} 
            onMouseLeave={onLeave} 
            className="timeslotBox"
            >
                <span className={hover ? "timeslotHover" : ""}>
                    { hover ?
                    `${activity.name}: ${timeslot.startTime} - ${timeslot.endTime}`
                    : ''
                    }
                </span>
                <button 
                onClick={handleDeleteClick} 
                className={hover ? "close visible" : "close"}
                >X</button>
            </div>
    )
}

export default TimeslotBox