import React, { useState, SyntheticEvent } from 'react'
import {useSelector} from 'react-redux';
import type { RootState } from '../app/store';
import { createActivity } from '../features/activities/activitySlice';
import { useAppDispatch } from '../app/hooks';

function ActivityForm() {
  const dispatch = useAppDispatch();
  const {message} = useSelector((state: RootState) => state.activities);

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

  const [formColor, setFormColor] = useState(colorList[0])
  const [isVisible, setIsVisible] = useState(false)


  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string },
    }
    const bodyData = {
      name: target.name.value,
      start: new Date().toLocaleDateString(),
      color: formColor
    }

    await dispatch(createActivity(bodyData));
}

  return (
    <div className='formBox'>
      <label htmlFor="activityForm">Add an Activity</label>
      <form onSubmit={onSubmit} name="activityForm">
                <label htmlFor="name">Name:</label>
                <input 
                  type="text"
                  name="name"
                  id="name"
                />
                <div className="colorBox" style={{backgroundColor: `rgb(${formColor})`}} onClick={() => setIsVisible(!isVisible)}>
                  <div className={isVisible ? "colorDropdown visible" : "colorDropdown"}>{colorList.map((color, index) => {
                    return (
                      <div className="colorBox" key={`colorBox-${index}`} style={{backgroundColor: `rgb(${color})`}} onClick={() => {setFormColor(color); setIsVisible(!isVisible)}}></div>
                    )
                    })}
                  </div>
                </div>

                <div className="errorbox">
                    {message}
                </div>
                <button type="submit" className="btn">Add</button>
        </form>
    </div>
  )
}

export default ActivityForm