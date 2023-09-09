import React, { useState, SyntheticEvent } from 'react'
import {useSelector} from 'react-redux';
import type { RootState } from '../app/store';
import { createActivity } from '../features/activities/activitySlice';
import { useAppDispatch } from '../app/hooks';

function ActivityForm({resetPopupOpen}: {resetPopupOpen: Function}) {
  const dispatch = useAppDispatch();
  const {message, isError} = useSelector((state: RootState) => state.activities);

  const [clientMessage, setClientMessage] = useState('')

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

  const [formColor, setFormColor] = useState(colorList[0])
  const [isVisible, setIsVisible] = useState(false)


  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string },
    }

    if (!target.name.value) {
      setClientMessage('Please provide an activity name')
      return;
    }

    const bodyData = {
      name: target.name.value,
      start: new Date().toLocaleDateString(),
      color: formColor
    }

    setClientMessage('')
    await dispatch(createActivity(bodyData));

    if (isError) {
      setClientMessage(message)
      return
    }

    resetPopupOpen()
}

  return (
    <div className="popupContainer">
      <div className='activityFormBox'>
        <div className='activityFormHeader'>Add an Activity</div>
        <form onSubmit={onSubmit} name="activityForm" className='activityForm'>
                <input 
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name "
                />
                <div className="colorBox" style={{backgroundColor: `rgb(${formColor})`}} onClick={() => setIsVisible(!isVisible)}>
                  <div className={isVisible ? "colorDropdown visible" : "colorDropdown"}>{colorList.map((color, index) => {
                    return (
                      <div className="colorBox" key={`colorBox-${index}`} style={{backgroundColor: `rgb(${color})`}} onClick={() => {setFormColor(color); setIsVisible(!isVisible)}}></div>
                    )
                    })}
                  </div>
                </div>              
                <button type="submit" className="submitBtn">Add</button>
        </form>
        <div className="errorbox">
          {clientMessage}
        </div>
        <button className="popupCancel" onClick={() => resetPopupOpen()}>Cancel</button>
      </div>
    </div>
    
  )
}

export default ActivityForm