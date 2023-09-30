import React from 'react'
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
        <li>
            <Link 
                to='/guide' 
                className='sidebarLink'
                onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
                onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
            >
                Guide
            </Link>
        </li>
        <li>
            <Link 
                to='/activities'
                className='sidebarLink'
                onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
                onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
            >
                Activities
            </Link>
        </li>   
        <li>
            <Link 
                to='/schedule'
                className='sidebarLink'
                onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
                onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
            >
                Schedule
            </Link>
        </li>
        <li>
            <Link 
                to='/log'
                className='sidebarLink'
                onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
                onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
            >
                Log
            </Link>
        </li>   
        <li>
            <Link
                to='/history'
                className='sidebarLink'
                onMouseEnter={(e) => onEnter(e.target as HTMLLIElement)}
                onMouseLeave={(e) => onLeave(e.target as HTMLLIElement)}
            >
                History
            </Link>
        </li>       
    </div>
  )
}

export default Sidebar