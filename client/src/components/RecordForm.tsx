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
        {!record ? 'Click on a day to add a record' : `${record.activity_name} on ${record.date}`}
      </div>
      <form onSubmit={onSubmit}>
        <input type="text"
          name="time"
          id="time"
        />
        <button>Add Record</button>
      </form>
    </> 
    )
}



export default RecordForm