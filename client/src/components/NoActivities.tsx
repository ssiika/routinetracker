import React from 'react'
import Sidebar from './Sidebar'

function NoActivities() {
  return (
    <>
        <Sidebar />
        <div className="content">
            <p className='noActivitiesMsg'>
                You have not added any activities yet. Head over to the 
                 <a className="inlineLink" href="/activities"> Activities</a> page and add your first
                activity to use this feature.
            </p>
        </div>
    </>
    
    
  )
}

export default NoActivities