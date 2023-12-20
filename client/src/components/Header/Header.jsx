
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import './header.css';

const Header = () => {
  const history = useHistory();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    history.push('/log-in');
  };

  return (
    <header className="Header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <p>HOME</p>
            </Link>
          </li>
          {user && (
            <li className="nav-item user-dropdown">
              <div
                className="user-info"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUser className="user-icon" />
                <span className="username"> {user.username}</span>
              </div>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <CiSettings className="logout-icon" />
                    Setting
                  </li>
                  <li className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt className="logout-icon" />
                    Logout
                  </li>
                </ul>
              )}
            </li>
          )}
          {!user && (
            <>
              <li className="nav-item">
                <Link to="/log-in" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sign-up" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
