import React, { SyntheticEvent } from 'react'
import { createTimeslot } from '../features/activities/activitySlice';
import { useAppDispatch } from '../app/hooks';
import type { RootState } from '../app/store';
import {useSelector} from 'react-redux';

function TimeslotForm() {
    const {userActivityList} = useSelector((state: RootState) => state.activities);

    const dispatch = useAppDispatch();
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(createTimeslot('e'));
    }

    return (
    <section className="addTimeslotFormBox">
        <form onSubmit={onSubmit} className="addkanjiform">
                <label htmlFor="kanji">Add a Kanji</label>
                <input 
                    type="text"
                    name="kanji"
                    id="kanji"
                    value={kanji}
                />
                <label htmlFor="activitySelect">Add a Timeslot</label>
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