import React from 'react'
import { Activity } from '../types'
import { useAppDispatch } from '../app/hooks';
import { deleteActivity } from '../features/activities/activitySlice';
import { deleteRecords } from '../features/records/recordSlice';

function DeleteConfirm({activity, resetDeletePending}: {activity: Activity, resetDeletePending: Function}) {
    const dispatch = useAppDispatch();
    
    const onEnter = (e: HTMLButtonElement) => {
        e.classList.add('deleteHover')
      }
    
    const onLeave = (e: HTMLButtonElement) => {
        e.classList.remove('deleteHover')
    } 

    const handleDelete = async (id: string) => {
        await dispatch(deleteActivity({id}))
        await dispatch(deleteRecords({id}))
        resetDeletePending()
        return
    }

    return (
        <div className="popupContainer">
            <div className="deleteBox">
                <div className="deleteText">
                    Are you sure you want to delete {activity.name}? 
                    All of your data for this activity will be lost.
                </div>
                <button 
                    className="activityDelete" 
                    onMouseEnter={(e) => onEnter(e.target as HTMLButtonElement)}
                    onMouseLeave={(e) => onLeave(e.target as HTMLButtonElement)}
                    onClick={() => handleDelete(activity._id)}
                >Delete</button>
                <button className="popupCancel" onClick={() => resetDeletePending()}>Cancel</button>
            </div>
        </div>  
    )
}
/* <div onClick={() => resetDeletePending()}></div>*/
export default DeleteConfirm