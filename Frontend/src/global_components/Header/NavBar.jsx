import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Icon from './Icon'
import { Link, useLocation } from 'react-router-dom'
import '../css/NavBar.css'


function NavBar() {
  const { colour } = useTheme()
  const location = useLocation()

  const centerButtons = [
    { name: 'Dashboard', path: '/' },
    { name: 'AI Tutor', path: '/ai-tut' },
    { name: 'Games', path: '/games' },
    { name: 'Progress', path: '/progress' },
    { name: 'Admin', path: '/admin' }
  ]

  const isActive = (btn) =>location.pathname==btn.path;

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Icon />
        <h2>CogniX</h2>
      </div>

      <div className="navbar__links">
        {centerButtons.map((btn) => (
          <Link
            key={btn.name}
            to={btn.path}
            onClick={() => setActiveButton(btn.name)}
            className={`nav-link ${isActive(btn) ? 'active' : ''}`}
            style={isActive(btn) ? { '--active-color': colour } : {}}
          >
            {btn.name}
          </Link>
        ))}
      </div>

      <div className="navbar__actions">
        <button className="icon-btn" aria-label="Toggle theme">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
        <button className="icon-btn" aria-label="Profile">
          <span className="material-symbols-outlined">person</span>
        </button>
        <button className="icon-btn logout" aria-label="Logout">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </nav>
  )
}

export default NavBar

