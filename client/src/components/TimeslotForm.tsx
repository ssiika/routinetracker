import React, { SyntheticEvent, useState } from 'react'
import { createTimeslot } from '../features/activities/activitySlice';
import { useAppDispatch } from '../app/hooks';
import type { RootState } from '../app/store';
import {useSelector} from 'react-redux';

function TimeslotForm({resetPopupOpen}: {resetPopupOpen: Function}) {
    const dispatch = useAppDispatch();

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    // These states are necessary for making sure the user can't select the end time to be before the start time
    const [startHours, setStartHours] = useState('00')
    const [startMinutes, setStartMinutes] = useState('00')
    const [endHours, setEndHours] = useState('00')
    const [endMinutes, setEndMinutes] = useState('00')
    const {userActivityList, message} = useSelector((state: RootState) => state.activities);

    const [clientMessage, setClientMessage] = useState(message ? message : '')


    
    const onSelectChange = (e: SyntheticEvent, fn: Function) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            value: string
        }
        const value = target.value
        fn(value)
    }

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            startHours: { value: string },
            startMinutes: { value: string },
            endHours: { value: string },
            endMinutes: { value: string },
            // Day is stored as a number, e.g. 0 for Monday, 1 for Tuesday
            daySelect: { value: string },
            activitySelect: { value: string }
        }
        
        const startTime = target.startHours.value.concat(target.startMinutes.value)
        const endTime = target.endHours.value.concat(target.endMinutes.value)
        const day = target.daySelect.value


        if (startTime === endTime) {
            setClientMessage('Start time and end time must not be the same')
            return;
        }

        // Check that inputted time doesnt overlap with existing timeslots

        for (let i = 0; i < userActivityList.length; i++) {
            for (let j = 0; j < userActivityList[i].timeslots.length; j++) {               
                let timeslot = userActivityList[i].timeslots[j]
                if (day === timeslot.day) {
                    const isOverlap = (timeslot.startTime >= startTime && endTime > timeslot.startTime) ||
                    (startTime >= timeslot.startTime && timeslot.endTime > startTime) 
                    if (isOverlap) {
                        setClientMessage('Timeslot overlaps with existing timeslot')
                        return;
                    }
                }
                
            }
        }

        const bodyData = {
            startTime,
            endTime,
            day,
            id: target.activitySelect.value
        }

        setClientMessage('')
        await dispatch(createTimeslot(bodyData));
    
        resetPopupOpen()
    }

    


    
    return (
        <div className="popupContainer">
            <section className="timeslotFormBox">
                <div className="timeslotFormHeader">Add a Timeslot</div>
                <form onSubmit={onSubmit} name="timeslotForm" className='timeslotForm'>
                    <label htmlFor="startHours">Start:</label>
                    <select 
                        className='formSelect'
                        name="startHours" 
                        id="startHours" 
                        onChange={(e) => {onSelectChange(e, setStartHours); onSelectChange(e, setEndHours);}} 
                        value={startHours}
                    >
                        {(function () {
                            let hoursArray = [];
                            for (let i = 0; i < 24; i++) {
                                let hour = `${Math.floor(i / 10)}${i % 10}`
                                hoursArray.push(
                                    <option value={hour} key={`sHOpt-${i}`}>{hour}</option>
                                )
                            }
                            return hoursArray
                        })()
                        }
                    </select>
                    <select 
                        className='formSelect'
                        name="startMinutes"
                        id="startMinutes"
                        onChange={(e) => onSelectChange(e, setStartMinutes)} 
                        value={startMinutes}
                    >
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                    <label htmlFor="endHours">End:</label>
                    <select 
                        className='formSelect'
                        name="endHours" 
                        id="endHours" 
                        onChange={(e) => onSelectChange(e, setEndHours)} 
                        value={endHours}
                    >
                        {(function () {
                            let hoursArray = [];
                            for (let i = 0; i < 25; i++) {
                                let hour = `${Math.floor(i / 10)}${i % 10}`
                                if (hour >= startHours) {
                                    hoursArray.push(
                                        <option value={hour} key={`eHOpt-${i}`}>{hour}</option>
                                    )
                                }     
                            }
                            return hoursArray
                        })()
                        }
                    </select>
                    <select 
                        className='formSelect'
                        name="endMinutes" 
                        id="endMinutes" 
                        onChange={(e) => onSelectChange(e, setEndMinutes)} 
                        value={endMinutes}
                    >
                        {(function () {
                            if (endHours === '24') {
                                return (
                                    <option value="00">00</option>
                                )
                            }
                            if (startHours === endHours && startMinutes === '30') {
                                return (
                                    <option value="30">30</option>
                                )
                            } else {
                                return (
                                    <>
                                        <option value="00">00</option>
                                        <option value="30">30</option>
                                    </>
                                )
                            }
                        })()
                        }   
                    </select>
                    <label htmlFor="daySelect">Day:</label>
                    <select name="daySelect" id="daySelect" className='formSelect'>
                        {days.map((day, index) => {
                            return (
                                <option value={index} key={`dayOption-${index}`}>{day}</option>
                            )
                        })}
                    </select>
                    <select name="activitySelect" id="activitySelect" className='formSelect'>
                        {userActivityList.map((activity, index) => {
                            return (
                                <option value={activity._id} key={`activityOption-${index}`}>{activity.name}</option>
                            )
                        })}
                    </select>
                    <button type="submit" className="submitBtn">Add</button>                                   
                </form>
                <div className="errorbox">
                        {clientMessage}
                </div> 
                <button className="popupCancel" onClick={() => resetPopupOpen()}>Cancel</button>
            </section>
        </div>
    )
}

export default TimeslotForm