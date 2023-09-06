import React, { useState } from 'react'
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store.js'
import {logout, reset} from '../features/auth/authSlice';
import { useAppDispatch } from '../app/hooks';

function Header() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {user} = useSelector((state: RootState) => state.auth);

    const [dropdownActive, setDropdownActive] = useState(false)

    const menuToggle = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setDropdownActive(!dropdownActive)
        }  
    }

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }
    return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Routine Tracker</Link>
        </div>
        <ul className='userInfo'>
            {user ? (
                <>
                    <li>
                        {user.username}
                    </li>
                    <li>
                        <div className="userIcon" onClick={menuToggle}>
                            
                                <ul className={dropdownActive ? "dropdown visible" : "dropdown"}>
                                        <li>
                                            <button className='logout' onClick={onLogout}>
                                                <FaSignOutAlt /> Logout
                                            </button>
                                        </li>                                 
                                </ul> 
                        </div>
                    </li>
                </>
                ) : (
                <>
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
                </>
                )}
        </ul>
    </header>
  )
}


export default Header