import React, { SyntheticEvent, useEffect, useState } from 'react'
import { createTimeslot } from '../features/activities/activitySlice';
import { useAppDispatch } from '../app/hooks';
import type { RootState } from '../app/store';
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getActivities, activityReset } from '../features/activities/activitySlice'

function TimeslotForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const ref = React.useRef<SyntheticEvent>(null)

    // These states are necessary for making sure the user can't select the end time to be before the start time
    const [startHours, setStartHours] = useState('00')
    const [startMinutes, setStartMinutes] = useState('00')
    const [endHours, setEndHours] = useState('00')
    const [endMinutes, setEndMinutes] = useState('00')
    const {user} = useSelector((state: RootState) => state.auth);
    const {userActivityList} = useSelector((state: RootState) => state.activities);
    
    const onSelectChange = (e: SyntheticEvent, fn: Function) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            value: string
        }
        const value = target.value
        fn(value)
    }

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        // dispatch(createTimeslot('e'));
    }

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
    <section className="addTimeslotFormBox">
        <label htmlFor="timeslotForm">Add a Timeslot</label>
        <form onSubmit={onSubmit} name="timeslotForm">
                <label htmlFor="startHours">Start:</label>
                <select 
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
                                <option value={hour}>{hour}</option>
                            )
                        }
                        return hoursArray
                    })()
                    }
                </select>
                <select 
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
                    name="endHours" 
                    id="endHours" 
                    onChange={(e) => onSelectChange(e, setEndHours)} 
                    value={endHours}
                >
                    {(function () {
                        let hoursArray = [];
                        for (let i = 0; i < 24; i++) {
                            let hour = `${Math.floor(i / 10)}${i % 10}`
                            if (hour >= startHours) {
                                hoursArray.push(
                                    <option value={hour}>{hour}</option>
                                )
                            }     
                        }

                        return hoursArray
                    })()
                    }
                </select>
                <select 
                    name="endMinutes" 
                    id="endMinutes" 
                    onChange={(e) => onSelectChange(e, setEndMinutes)} 
                    value={endMinutes}
                >
                    {(function () {
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
                <select name="activitySelect" id="activitySelect">
                    {userActivityList.map((activity) => {
                        return (
                            <option value={activity._id}>{activity.name}</option>
                        )
                    })}
                </select>
                <button type="submit" className="btn">Add</button>
        </form>
    </section>
  )
}

export default TimeslotForm