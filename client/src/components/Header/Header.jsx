import './header.css';

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Header = () => {
  const history = useHistory()
  const { user } = useAuthContext()
  const { logout } = useLogout();

  return (
    <header className='Header'>
      <nav className='navbar'>
        <ul className='nav-list'>
          <li className='nav-item'>
            <Link to="/" className='nav-link'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to="/patient-dashboard" className='nav-link'>Dashboard</Link>
          </li>
          <li className='nav-item'>{user && (
            <button className='button' onClick={() => {
              logout()
              history.push('/log-in')
            }}>Logout</button>
          )}</li>
          <li className='nav-item'>{!user && (
            <button className='button' onClick={() => {
              history.push('/log-in')
            }}>Login</button>
            )}</li>
          <li className='nav-item'>{!user && (
            <button className='button' onClick={() => {
              history.push('/sign-up')
            }}>Sign Up</button>
          )}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
