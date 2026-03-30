import  { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Color mapping based on mood
const moodColors = {
  Engaged: "#f97316",
  Neutral: "#6366f1",
  Confused: "#a855f7",
  Stressed: "#14b8a6",
  Bored: "#eab308"
};



export function ThemeProvider({ children }) {
  const [mood, setMood] = useState("Confused");
  const [colour, setColour] = useState(moodColors["Confused"]);

  //update  on mood change
  useEffect(() => {
    setColour(moodColors[mood] || moodColors["Neutral"]);
  }, [mood]);

  // Function to update mood (call this from your backend)
  const updateMood = (newMood) => {
    if (moodColors[newMood]) {
      setMood(newMood);
    }
  };

  const value = {
    mood,
    colour,
    updateMood,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme anywhere
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
