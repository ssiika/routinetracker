import React, { useState, SyntheticEvent } from 'react'
import { RecordUpdateData } from '../types'

function RecordForm( {record}: {record: RecordUpdateData | null})  {

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log((e.target as HTMLTextAreaElement).value)
  }


  return (
    <>
      <div>
        {record ? `${record.activity_name} on ${record.date}` : 'Click on a day to add a record'}
      </div>
      <form onSubmit={onSubmit}>
        <input type="text"
          name="time"
          id="time"
          disabled={!record ? true: false}
        />
        <button className={record ? 'btn' : 'btn disabled'} disabled={!record ? true: false}>Add Record</button>
      </form>
    </> 
    )
}



export default RecordForm