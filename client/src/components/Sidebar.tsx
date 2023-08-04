import React from 'react'
import {Link} from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
        <li className='sidebarLink'>
            <Link to='/schedule'>
                Schedule
            </Link>
        </li>
        <li className='sidebarLink'>
            <Link to='/log'>
                Log
            </Link>
        </li>   
        <li className='sidebarLink'>
            <Link to='/history'>
                History
            </Link>
        </li>
    </div>
  )
}

export default Sidebar