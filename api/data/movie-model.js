const mongoose = require('mongoose');

const actorSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  roles: {
    type: String,
  },
});
const moviesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  release: {
    type: Number,
    require: true,
  },
  actors: {
    type: [actorSchema],
  },
});

mongoose.model(process.env.MOVIE_MODEL, moviesSchema, process.env.MOVIES_COLLECTION);
