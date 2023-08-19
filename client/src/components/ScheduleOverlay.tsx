import React, { useState } from 'react'
import type { RootState } from '../app/store';
import {useSelector} from 'react-redux';
import TimeslotBox from './TimeslotBox';

function ScheduleOverlay() {
    const {userActivityList} = useSelector((state: RootState) => state.activities);

    return (
        <div className='overlay'>
            {userActivityList.map((activity) => {
                return (
                activity.timeslots.map((timeslot) => {
                    return (
                    <TimeslotBox timeslot={timeslot} activity={activity} />
                    )
                })
                )
            })}
        </div>
    )
}

export default ScheduleOverlay