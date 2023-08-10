import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import type { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import Sidebar from '../components/Sidebar'
import { getActivities, updateActivity, activityReset } from '../features/activities/activitySlice'

function Colors() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {userActivityList} = useSelector((state: RootState) => state.activities);
  const {user} = useSelector((state: RootState) => state.auth);

  const dropdownToggle = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      const dropdown = e.currentTarget.firstChild as HTMLElement
      dropdown.classList.toggle('visible')
    }  
  }

  const onColorClick = (id: string, color: string) => {
    dispatch(updateActivity({id, color}))
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

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getActivities())

    return () => {
      dispatch(activityReset())
    }
  }, [user, dispatch, navigate])

  return (
    <>
        <Sidebar />
        <div className='content'>
          {userActivityList.map((activity) => {
            return (
              <div className="colorSettingsBox" key={activity._id}>
                <div className="colorSettingsName">
                  {activity.name}
                </div>
                <div className="colorSelector" style={{backgroundColor: `rgb(${activity.color})`}} onClick={dropdownToggle}>
                  <div className="colorDropdown">{colorList.map((color) => {
                    return (
                      <div className="colorSelector" style={{backgroundColor: `rgb(${color})`}} onClick={() => onColorClick(activity._id, color)}></div>
                    )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    </>
    
  )
}

export default Colors