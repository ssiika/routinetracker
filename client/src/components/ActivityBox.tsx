import React, { useState } from 'react'
import { Activity } from '../types'
import { useAppDispatch } from '../app/hooks';
import { updateActivity } from '../features/activities/activitySlice'
import DeleteConfirm from './DeleteConfirm';

function ActivityBox({activity}: {activity: Activity}) {
    const dispatch = useAppDispatch();

    const [deletePending, setDeletePending] = useState<Activity | null>(null)

    const onEnter = (e: HTMLButtonElement) => {
        e.classList.add('deleteHover')
      }
    
    const onLeave = (e: HTMLButtonElement) => {
        e.classList.remove('deleteHover')
    } 

    const resetDeletePending = () => {
        setDeletePending(null)
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
        <div 
            className="activityPageBox" 
            key={activity._id}
            style={{border: `2px solid rgb(${activity.color}, 0.4)`, 
                    boxShadow: `2px 2px rgb(${activity.color}, 0.2)`
                  }}
        >
            <div className="activityPageName">
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
                onClick={() => setDeletePending(activity)}
            >Delete</button>
            {deletePending && 
            <DeleteConfirm 
                resetDeletePending={resetDeletePending} 
                activity={deletePending} 
            />}
        </div>
  )
}

export default ActivityBox