// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/theme';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';
import { useAuth } from '../contexts/auth';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthed } = useAuth();
  return (
    <nav className={`navbar sticky-top bg-${theme} text-bg-${theme} mb-4`}>
      <div className='container-fluid flex-column flex-sm-row align-items-start align-items-sm-center'>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/transactions'>
            Transactions
          </NavLink>
        </div>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/places'>
            Places
          </NavLink>
        </div>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/about'>
            About us
          </NavLink>
        </div>
        <div className='flex-grow-1'></div>
        {
          isAuthed ? (
            <div className='nav-item my-2 mx-sm-3 my-sm-0'>
              <Link className='nav-link' to='/logout' data-cy="logout_btn">
                Logout
              </Link>
            </div>
          ) : (
            <>
              <div className='nav-item my-2 mx-sm-3 my-sm-0'>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </div>
              <div className="nav-item my-2 mx-sm-3 my-sm-0">
                <Link className="nav-link" to="/register" data-cy='logout_btn'>Register</Link>
              </div>
            </>
          )
        }
        <button
          className='btn btn-secondary'
          type='button'
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <IoMoonSharp /> : <IoSunny />}
        </button>
      </div>
    </nav>
  );
}
