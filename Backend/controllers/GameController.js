const Game = require("../models/Games.js");

const getGames = async (req, res) => {
  const sampleGames = [
    {
      _id: '1',
      title: 'Sorting Algorithm Race',
      description: 'Sort arrays faster than the AI using different algorithms',
      difficulty: 'Medium',
      time: '5-10 min',
      topic: 'sorting'
    },
    {
      _id: '2',
      title: 'Tree Traversal Quest',
      description: 'Navigate through binary trees and collect nodes',
      difficulty: 'Hard',
      time: '10-15 min',
      topic: 'tree'
    },
    {
      _id: '3',
      title: 'Memory Match: Big-O',
      description: 'Match algorithms with their time complexity',
      difficulty: 'Easy',
      time: '3-5 min',
      topic: 'memory'
    }
  ];

  try {
    const games = await Game.find();
    return res.json(games && games.length > 0 ? games : sampleGames);
  } catch (error) {
    return res.json(sampleGames);
  }
};

const createGame = async (req, res) => {
  try {
    const { title, description, difficulty, time, topic } = req.body;

    const game = new Game({
      title,
      description,
      difficulty,
      time,
      topic,
    });

    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGames, createGame };