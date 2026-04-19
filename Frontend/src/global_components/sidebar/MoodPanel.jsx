import {useEffect, useState} from 'react'
import { useTheme } from '../../context/ThemeContext'
import '../css/MoodPanel.css'

const moodEmojis = {
  Engaged: '😎',
  Neutral: '😊',
  Confused: '🤔',
  Stressed: '😨',
  Bored: '🥱'
};

function MoodPanel() {
  const { mood, colour, adaptiveUI, setAdaptiveUI, updateMood } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const moods = ["Engaged", "Neutral", "Confused", "Stressed", "Bored"];
  const [selectedMood, setSelectedMood] = useState(mood);

  const handleMoodSelect=(selectedMood)=>{
    updateMood(selectedMood);
    setShowDropdown(false);
  }

 useEffect(() => {
  if (adaptiveUI) {
    setSelectedMood(mood);
  } else {
    setSelectedMood("Neutral");
  }
}, [mood, adaptiveUI]);

  return (
    <section className="mood-panel">
      <header className="mood-panel__header">
        <span
          className="material-symbols-outlined mood-panel__icon"
          style={{ color: colour, fontSize: '27px' }}
        >
          neurology
        </span>
        <span className="mood-panel__heading">Mood Detection</span>
      </header>

      <div className="mood-panel__body">
        
        <div className="mood-panel__main">
          <div
            className="mood_ring" style={{border: `8px solid ${colour}`}}
          >
            {moodEmojis[selectedMood]}
          </div>

          <div style={{ position: 'relative' }}>
           <h1
              className="mood-panel__title"
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {selectedMood}
              <span className="material-symbols-outlined symbol">
                keyboard_arrow_down
              </span>
            </h1>

            {showDropdown && adaptiveUI &&(
              <div className="mood-dropdown">
                {moods.map((item, index) => (
                  <div
                    key={index}
                    className="mood-dropdown__item"
                    onClick={() => handleMoodSelect(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            <div className="mood-panel__detection">
              <span className="mood-panel__detection-label" style={{ color: colour }}>
                 ⓘ How is this detected?
              </span>
              <div className="mood-panel__hoverText">
                  AI analyses your interaction patterns, response times and sentiment from messages. 
              </div>
            </div>
          </div>
        </div>

        <div className="mood-panel__adaptive" style={{'--toggle-color': colour}}>
         <div>
           <div className="mood-panel__adaptive-label">Adaptive UI</div>
          <div className='mood-panel__adaptive-desc'>{adaptiveUI ? 'AI-driven styling active.' : 'Static theme'}</div>
         </div>
          <label className="switch">
            <input type="checkbox" checked={adaptiveUI} onChange={()=>setAdaptiveUI(!adaptiveUI)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="mood-panel__status">
          {adaptiveUI ? (
            <p className="mood-panel__status-text">
              <span className="mood-panel__status-label" style={{ color: colour }}>
                ✓ Active :
              </span>{" "}
              UI adapts to your mood with custom accents and spacing
            </p>
          ) : (
            <p className="mood-panel__status-text">
              <span className="mood-panel__status-label" style={{ color: 'darkgrey' }}>
                ○ Inactive :
              </span>{" "}
              Mood is tracked but UI remains neutral
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default MoodPanel
