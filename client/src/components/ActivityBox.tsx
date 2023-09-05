import React from 'react'
import { Activity } from '../types'
import { useAppDispatch } from '../app/hooks';
import { updateActivity } from '../features/activities/activitySlice'

function ActivityBox({activity}: {activity: Activity}) {
    const dispatch = useAppDispatch();

    const onEnter = (e: HTMLButtonElement) => {
        e.classList.add('deleteHover')
      }
    
    const onLeave = (e: HTMLButtonElement) => {
        e.classList.remove('deleteHover')
    }

    const onColorClick = (id: string, color: string) => {
        dispatch(updateActivity({id, color}))
    }

    const dropdownToggle = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          const dropdown = e.currentTarget.firstChild as HTMLElement
          dropdown.classList.toggle('visible')
        }  
    }

    const colorList = [
        // red
        '255, 51, 51',
        // green
        '51, 153, 51',
        // blue
        '51, 51, 255',
        // yellow
        '255, 255, 51',
        // orange
        '255, 153, 51',
        // light blue
        '51, 255, 255',
        // light green 
        '153, 255, 51',
        // black
        '0, 0, 0',
        // purple
        '128, 51, 128', 
        // pink
        '255, 51, 255', 
    ]

    return (
        <div className="colorSettingsBox" key={activity._id}>
            <div className="colorSettingsName">
                {activity.name}
            </div>
            <div className="colorBox" style={{backgroundColor: `rgb(${activity.color})`}} onClick={dropdownToggle}>
                <div className="colorDropdown">{colorList.map((color, index) => {
                    return (
                      <div 
                        className="colorBox" 
                        style={{backgroundColor: `rgb(${color})`}} 
                        onClick={() => onColorClick(activity._id, color)}
                        key={`${activity._id}-color${index}`}
                      ></div>
                    )
                    })}
                </div>
            </div>
            <button 
                className="activityDelete" 
                onMouseEnter={(e) => onEnter(e.target as HTMLButtonElement)}
                onMouseLeave={(e) => onLeave(e.target as HTMLButtonElement)}
            >Delete</button>
        </div>
  )
}

export default ActivityBox