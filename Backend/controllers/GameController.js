const Game = require("../models/Games.js");

const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGame = async (req, res) => {
  try {
    const { title, description, difficulty, time } = req.body;

    const game = new Game({
      title,
      description,
      difficulty,
      time,
    });

    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGames, createGame };