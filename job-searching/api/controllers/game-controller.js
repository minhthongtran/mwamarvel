const mongoose = require('mongoose');

const Game = mongoose.model(process.env.GAME_MODEL);

const getAll = function (req, res) {
  const lng = req.query.long;
  const lat = req.query.lat;
  const distance = req.query.distance;
  let query;
  if (lng && lat && distance) {
    query = {
      'publisher.location.coordinates': {
        $near: {
          $geometry: {
            type: 'point',
            coordinates: [lng, lat],
          },
          $minDistance: 0,
          $maxDistance: distance,
        },
      },
    };
  }
  Game.find(query).exec(function (err, games) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(games);
    }
  });
};

const getOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(game);
    }
  });
};

module.exports = {
  getAll,
  getOne,
};
