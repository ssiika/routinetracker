import React from 'react'
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
        <ul>
            {user ? (
                <>
                    <li>
                        {user.username}
                    </li>
                    <li>
                        <button className='logout' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
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