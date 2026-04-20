import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import '../css/QuickActions.css'
import {Link} from 'react-router-dom'

function QuickActions() {
  const {colour} = useTheme()
  return (
    
    <div className='w-full p-0 m-6'>
      <div className="relative p-6 rounded-2xl border border-gray-200 bg-white overflow-hidden" 
          style={{ boxShadow: `0 10px 25px -5px ${colour}30` }}>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>

        <div className="flex flex-col gap-3 btns" style={{'--moodcolour': colour}}>
            <button ><Link to="/ai-tut" >💭 Ask AI Tutor</Link></button>
            <button ><Link to="/games">🎮 Play Learning Game</Link></button>
            <button ><Link to="/forum">❓ Raise a Doubt</Link></button>
        </div></div>

    </div>
  )
}

export default QuickActions
