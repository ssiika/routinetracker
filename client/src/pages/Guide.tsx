import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import type { RootState } from '../app/store';
import Sidebar from '../components/Sidebar'

function Guide() {
  const navigate = useNavigate();

  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/login')
    }
  })

  return (
    <>
        <Sidebar />
        <div className='content guideContent'>
          <h2>Overview</h2>
          <p>
            This app is meant to be used as a way of keeping track of habits, hobbies,
             or any other thing that you do on a regular basis and want to monitor. 
            The app is flexible, and you can pick and choose which features are applicable to your needs.
            For example, you may opt to use the log feature and avoid using the schedule feature, or vice versa.
            To start, you can head over to the <a className="inlineLink" href="/activities">Activities</a> page and create your first activity.
          </p>
          <h3>Activities</h3>
          <p>
            Activities can be anything that you wish to monitor, including sleep, hobbies, or even a habit like procrastination
            that you are looking to cut down on.
          </p>
          <p>          
            On the activities page, you can view your current activities, create activities, adjust colour schemes and delete activities.
            All other features of the app use these activities, so it is recommended to visit here first.
          </p>
          <h3>Schedule</h3>
          <p>
            The schedule page is designed to visiually organise activities you do on a regular schedule. You can add a timeslot for each of your activities 
            which will display on the calendar. Timeslots can be deleted by clicking in the top right corner of the relevant timeslot.
          </p>
          <h3>Log</h3>
          <p>
            The log page allows you to add a record of the time you have spent on an activity on a given day. The log page can be used for
            activities done on a regular schedule, or for tracking more irregular activities or habits. It is designed to be updated regularly,
            and only allows users to add records from a maximum of 30 days ago. A more extensive history can be found on the history page.
          </p>
          <h3>History</h3>
          <p>
            This page provides a history of the records added on the log page. It is useful for keeping track of long term trends in time spent on
            your activities. Records are accumulated by month, and you can choose to view either by the total time spent per month or the average 
            per day for a given month.
          </p>
        </div>
    </>   
  )
}

export default Guide