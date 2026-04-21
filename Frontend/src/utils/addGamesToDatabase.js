import axios from 'axios';
import games from '../data/Games.js';

const addGamesToDatabase = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No token found. Please login first.');
    return;
  }

  try {
    // Map game titles to topics
    const getTopic = (title) => {
      const t = title.toLowerCase();
      if (t.includes("sorting")) return "sorting";
      if (t.includes("tree")) return "tree";
      if (t.includes("memory")) return "memory";
      return "general";
    };

    for (const game of games) {
      const gameData = {
        title: game.title,
        description: game.description,
        difficulty: game.difficulty,
        time: game.time,
        topic: getTopic(game.title)
      };

      const response = await axios.post(
        'https://cognix-v9mv.onrender.com/api/games',
        gameData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Added game:', game.title);
    }
    console.log('All games added successfully!');
  } catch (error) {
    console.error('Error adding games:', error.response?.data || error.message);
  }
};

// Run the function
addGamesToDatabase();