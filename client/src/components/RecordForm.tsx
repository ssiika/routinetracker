import React, { SyntheticEvent, useState } from 'react'
import {useSelector} from 'react-redux';
import type { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import { RecordUpdateData } from '../types'
import { updateRecord, createRecord } from '../features/records/recordSlice';

function RecordForm( {record, resetPopupOpen}: {record: RecordUpdateData | null, resetPopupOpen: Function})  {
  const dispatch = useAppDispatch();
  const {message, isError} = useSelector((state: RootState) => state.records);

  const [clientMessage, setClientMessage] = useState('')

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      time: { value: string }
    }
    const time = target.time.value.trim()

    // Check that input is a number
    if (isNaN(parseInt(time))) {
      setClientMessage('Please input a number')
      return;
    }

    setClientMessage('')

    if (record && record.id) {
      // Record exists and needs to be updated

      const bodyData = {
        id: record.id,
        time
      }
      await dispatch(updateRecord(bodyData))
      
    } else if (record && !record.id) {
      // Record for this date does not exist, needs to be added

      const bodyData = {
        activity_id: record.activity_id,
        day: record.day,
        time
      }
      await dispatch(createRecord(bodyData))
    }

    if (isError) {
      setClientMessage(message)
      return
    }

    resetPopupOpen()

  }


  return (
      <div className="popupContainer">
        <div className="recordFormBox">
          <div className='recordDesc'>
            {record ? `Minutes spent on ${record.activity_name} on ${record.day}:` : 'Click on a day to add a record'}
          </div>
          <form className="recordForm" onSubmit={onSubmit}>
            <input type="text"
              name="time"
              id="time"
              placeholder='Minutes'
              disabled={!record ? true: false}
            />
            <button type="submit" className={record ? 'submitBtn' : 'submitBtn disabled'} disabled={!record ? true: false}>Add</button>
          </form>
          <div className="errorbox">
          {clientMessage}
        </div>
          <button className="popupCancel" onClick={() => resetPopupOpen()}>Cancel</button>
        </div>       
      </div>
    )
}



export default RecordForm