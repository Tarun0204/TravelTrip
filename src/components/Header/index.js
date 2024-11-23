import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <ul className="nav-menu-list-mobile">
            <Link to="/">
              <li className="nav-menu-item-mobile">
                <img
                  src="https://ik.imagekit.io/6nnzgbkjv4/Home_Logo.png?updatedAt=1731654049830"
                  className="home-logo-mobile"
                  alt="Home Logo"
                />
              </li>
            </Link>
            <Link to="/my-trips">
              <li className="nav-menu-item-mobile">
                <img
                  src="https://ik.imagekit.io/6nnzgbkjv4/Trips_Logo.png?updatedAt=1731654066353"
                  className="trips-logo-mobile"
                  alt="Trips Logo"
                />
              </li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-mobile-btn"
            onClick={onClickLogout}
          >
            <img
              src="https://ik.imagekit.io/6nnzgbkjv4/logout.png?updatedAt=1731654084564"
              className="logout-mobile-button"
              alt="Logout"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/" className="nav-link">
            <h1 className="header-logo">Travel Trip</h1>
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/my-trips" className="nav-link">
                My Trips
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
