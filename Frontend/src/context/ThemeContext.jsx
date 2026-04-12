import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const moodColors = {
  Engaged: '#f97316',
  Neutral: '#6366f1',
  Confused: '#a855f7',
  Stressed: '#14b8a6',
  Bored: '#eab308',
};

const themeVariables = {
  '--bg': '#f8fafc',
  '--surface': '#ffffff',
  '--surface-muted': '#f1f5f9',
  '--border': '#e2e8f0',
  '--text': '#0f172a',
  '--subtext': '#64748b',
  '--primary': '#6366f1',
  '--accent': '#8b5cf6',
};

export function ThemeProvider({ children }) {
  const [mood, setMood] = useState('Neutral');
  const [colour, setColour] = useState(moodColors['Neutral']);

  useEffect(() => {
    setColour(moodColors[mood] || moodColors['Neutral']);
  }, [mood]);

  useEffect(() => {
    const root = document.documentElement;
    const vars = themeVariables;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.style.setProperty('--mood-color', colour);
  }, [colour]);

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

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
