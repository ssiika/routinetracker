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

    const onLogout = async () => {
        setDropdownActive(!dropdownActive)
        await dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Routine Tracker</Link>
        </div>
        <ul className='userInfo'>
            {(user && Object.keys(user).length !== 0)  ? (
                <>
                    <li>
                        {user.username}
                    </li>
                    <li>
                        <div className="userIcon">
                            <div className="userIconSymbol" onClick={menuToggle}>
                               { user.username ? user.username[0] : ''}
                            </div>
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
                    <li>
                        <Link to='/register' className='registerbox'>
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