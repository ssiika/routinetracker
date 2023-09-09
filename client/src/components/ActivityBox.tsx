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
        // dark brown 
        '92, 64, 51',
        // maroon
        '128, 0, 0',
        // brown
        '170, 110, 40',
        // olive
        '128, 128, 0',
        // green
        '60, 180, 75',
        // navy
        '0, 0, 128',
        // purple
        '145, 30, 180',
        // black
        '0, 0, 0',
        // red
        '230, 25, 75',
        // orange
        '245, 130, 48',
        // yellow
        '255, 225, 25',
        // teal
        '0, 128, 128',
        // blue
        '0, 130, 200',
        // magenta
        '240, 50, 230',
        // grey
        '128, 128, 128',        
        // pink 
        '250, 190, 212',
        // apricot
        '255, 215, 180',
        // lime
        '210, 245, 60',
        // mint
        '170, 255, 195',
        // cyan 
        '70, 240, 240',
        // lavender
        '220, 190, 255'   
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