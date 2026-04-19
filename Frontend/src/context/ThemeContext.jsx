import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const moodColors = {
  Engaged: "#f97316",
  Neutral: "#6366f1",
  Confused: "#a855f7",
  Stressed: "#14b8a6",
  Bored: "#eab308"
};

export function ThemeProvider({ children }) {

  // ✅ persist mood
  const [mood, setMood] = useState(() => {
    return localStorage.getItem("mood") || "Neutral";
  });

  // ✅ persist adaptive UI
  const [adaptiveUI, setAdaptiveUI] = useState(() => {
    return JSON.parse(localStorage.getItem("adaptiveUI")) ?? true;
  });

  const [colour, setColour] = useState(moodColors["Neutral"]);

  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  useEffect(() => {
    localStorage.setItem("adaptiveUI", adaptiveUI);
  }, [adaptiveUI]);

  // ✅ MAIN LOGIC (correct)
  useEffect(() => {
    if (adaptiveUI) {
      setColour(moodColors[mood] || moodColors["Neutral"]);
    } else {
      setColour(moodColors["Neutral"]);
    }
  }, [mood, adaptiveUI]);

  const updateMood = (newMood) => {
    if (moodColors[newMood]) {
      setMood(newMood);
    }
  };

  return (
    <ThemeContext.Provider value={{
      mood,
      colour,
      adaptiveUI,
      setAdaptiveUI,
      updateMood
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}