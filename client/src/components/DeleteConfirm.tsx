import React from 'react'
import { Activity } from '../types'

function DeleteConfirm({activity, resetDeletePending}: {activity: Activity, resetDeletePending: Function}) {
    
    const onEnter = (e: HTMLButtonElement) => {
        e.classList.add('deleteHover')
      }
    
    const onLeave = (e: HTMLButtonElement) => {
        e.classList.remove('deleteHover')
    } 

    const handleDelete = (id: string) => {

    }

    return (
        <div className="deleteBoxContainer">
            <div className="deleteBox">
                <div className="deleteText">
                    Are you sure you want to delete {activity.name}? 
                    All of your data for this activity will be lost
                </div>
                <button 
                    className="activityDelete" 
                    onMouseEnter={(e) => onEnter(e.target as HTMLButtonElement)}
                    onMouseLeave={(e) => onLeave(e.target as HTMLButtonElement)}
                    onClick={() => handleDelete(activity._id)}
                >Delete</button>
                <button className="deleteCancel" onClick={() => resetDeletePending()}>Cancel</button>
            </div>
        </div>  
    )
}
/* <div onClick={() => resetDeletePending()}></div>*/
export default DeleteConfirm