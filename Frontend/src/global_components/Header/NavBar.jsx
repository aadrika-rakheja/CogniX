import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Icon from './Icon'
import { Link, useLocation } from 'react-router-dom'
import '../css/NavBar.css'
import { useNavigate } from 'react-router-dom'


function NavBar() {
  const { colour } = useTheme()
  const location = useLocation()
  const role=localStorage.getItem("role");
  const navigate=useNavigate();
  console.log(role);

  const centerButtons = role=="user"?[
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'AI Tutor', path: '/ai-tut' },
    { name: 'Quiz', path: '/games' },
    { name: 'Progress', path: '/progress' }
  ]:[
    { name: 'Admin', path: '/admin' },
    {name:'Games', path:'/admin/:topic'}
  ]
  
  const isActive = (btn) =>location.pathname==btn.path;

  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("mood");
    navigate("/");
  }

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
        <button className="icon-btn" onClick={() => window.location.reload()} title="Refresh Dashboard">
          <span className="material-symbols-outlined">autorenew</span>
        </button>
        <button className="icon-btn logout" aria-label="Logout" onClick={handleLogout} title="Logout">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </nav>
  )
}

export default NavBar

