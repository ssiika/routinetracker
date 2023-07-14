import React from 'react'
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Routine Tracker</Link>
        </div>
        <li>
            <Link to='/login'>
                Login
            </Link>
        </li>
        <li className='registerbox'>
            <Link to='/register'>
                <FaUser /> Register
            </Link>
        </li>
    </header>
    
  )
}

export default Header