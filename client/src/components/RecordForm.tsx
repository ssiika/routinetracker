import React, { SyntheticEvent } from 'react'
import { useAppDispatch } from '../app/hooks';
import { RecordUpdateData } from '../types'
import { updateRecord, createRecord } from '../features/records/recordSlice';

function RecordForm( {record}: {record: RecordUpdateData | null})  {
  const dispatch = useAppDispatch();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      time: { value: string }
    }
    const time = target.time.value

    if (record && record.id) {
      // Record exists and needs to be updated

      const bodyData = {
        id: record.id,
        time
      }
      dispatch(updateRecord(bodyData))
      
    } else if (record && !record.id) {
      // Record for this date does not exist, needs to be added

      const bodyData = {
        activity_id: record.activity_id,
        day: record.day,
        time
      }
      dispatch(createRecord(bodyData))
    }

  }


  return (
    <>
      <div>
        {record ? `${record.activity_name} on ${record.day}` : 'Click on a day to add a record'}
      </div>
      <form onSubmit={onSubmit}>
        <input type="text"
          name="time"
          id="time"
          disabled={!record ? true: false}
        />
        <button type="submit" className={record ? 'btn' : 'btn disabled'} disabled={!record ? true: false}>Add Record</button>
      </form>
    </> 
    )
}



export default RecordForm