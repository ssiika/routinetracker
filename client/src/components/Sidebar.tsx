import React, { ReactHTMLElement } from 'react'
import {Link} from 'react-router-dom';

function Sidebar() {
  const onEnter = (e: HTMLLIElement) => {
    e.classList.add('sidebarSelected')
  }

  const onLeave = (e: HTMLLIElement) => {
    e.classList.remove('sidebarSelected')
  }

  return (
    <div className='sidebar'>
        <li className='sidebarLink' 
            onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
            onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
        >
            <Link to='/schedule'>
                Schedule
            </Link>
        </li>
        <li className='sidebarLink' 
            onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
            onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
        >
            <Link to='/log'>
                Log
            </Link>
        </li>   
        <li className='sidebarLink' 
            onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
            onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
        >
            <Link to='/history'>
                History
            </Link>
        </li><li className='sidebarLink' 
            onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
            onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
        >
            <Link to='/guide'>
                Guide
            </Link>
        </li>
    </div>
  )
}

export default Sidebar