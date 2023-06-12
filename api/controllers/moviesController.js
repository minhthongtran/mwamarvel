const mongoose = require('mongoose');
const callbackify = require('util').callbackify;
const responseUtil = require('../util/responseUtil');

const Movie = mongoose.model(process.env.MOVIE_MODEL);

const getAll = function (req, res) {
  let offset = parseFloat(process.env.DEFAULT_OFFSET, 10);
  let count = parseFloat(process.env.DEFAULT_COUNT, 10);
  let maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);

  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.count) {
    count = parseInt(req.query.count);
  }

  if (isNaN(offset) || isNaN(count)) {
    responseUtil._getNotFoundResponse(
      parseInt(process.env.HTTP_BAD_REQUEST_STATUS_CODE),
      process.env.ERROR_QUERY_OFFSET_COUNT_MESSAGE
    );
  }
  if (count > maxCount) {
    responseUtil._getNotFoundResponse(
      parseInt(process.env.HTTP_BAD_REQUEST_STATUS_CODE),
      process.env.ERROR_MAXCOUNT_MESSAGE + maxCount
    );
  }
  let response = responseUtil._initResponse();
  Movie.find({})
    .sort('location')
    .skip(offset)
    .limit(count)
    .exec()
    .then((movies) => responseUtil._getSuccessResponse(movies, response))
    .catch((err) => responseUtil._getErrorResponse(err, response))
    .finally(() => res.status(response.status).json(response.message));
};

const createOne = function (req, res) {
  let newMovie = {
    name: req.body.name,
    release: req.body.release,
    actors: req.body.actors,
  };

  let response = responseUtil._initResponse();

  Movie.create(newMovie)
    .then((newMovie) => responseUtil._getSuccessResponse(newMovie, response))
    .catch((err) => responseUtil._getErrorResponse(err, response))
    .finally(() => res.status(response.status).json(response.message));
};

const deleteOne = function (req, res) {
  let movieId = req.params.movieId;

  let response = responseUtil._initResponse();

  Movie.findByIdAndDelete(movieId)
    .exec()
    .then((deletedMovie) =>
      responseUtil._getSuccesAndNotFoundReponse(
        deletedMovie,
        process.env.ERROR_MOVIE_ID_NOT_FOUNT_MESSAGE,
        response
      )
    )
    .catch((err) => responseUtil._getErrorResponse(err, response))
    .finally(() => res.status(response.status).json(res.message));
};

const getOne = function (req, res) {
  let movieId = req.params.movieId;
  let response = responseUtil._initResponse();
  Movie.findById(movieId)
    .exec()
    .then((movie) =>
      responseUtil._getSuccesAndNotFoundReponse(
        movie,
        process.env.ERROR_MOVIE_ID_NOT_FOUNT_MESSAGE,
        response
      )
    )
    .catch((err) => responseUtil._getErrorResponse(err, response))
    .finally(() => res.status(response.status).json(response.message));
};

const updateOne = function (req, res) {
  let movieId = req.params.movieId;
  _findAndUpdateMovie(movieId, req, res);
};

const updatePartialOne = function (req, res) {
  let movieId = req.params.movieId;
  _findAndUpdateMovie(movieId, req, res, true);
};

const _fillPartialUpdateMovie = function (movie, req) {
  if (req.body.name) {
    movie.name = req.body.name;
  }
  if (req.body.release) {
    movie.release = req.body.release;
  }
  if (req.body.actors) {
    movie.actors = req.body.actors;
  }
};

const _fillFullUpdateMovie = function (movie, req) {
  movie.name = req.body.name;
  movie.release = req.body.release;
  movie.actors = req.body.actors;
};

const _findAndUpdateMovie = function (movieId, req, res, _paritalUpdate) {
  let response = responseUtil._initResponse();
  Movie.findById(movieId)
    .exec()
    .then((movie) =>
      responseUtil._checkExistedMovie(movie, process.env.ERROR_MOVIE_ID_NOT_FOUNT_MESSAGE)
    )
    .then((movie) => {
      _fillUpdatedMovie(_paritalUpdate, movie, re);
      _updateOneMovie(movie);
    })
    .then((updateMovie) =>
      responseUtil._getSuccesAndNotFoundReponse(
        updateMovie,
        process.env.ERROR_MOVIE_ID_NOT_FOUNT_MESSAGE,
        response
      )
    )
    .catch((err) => responseUtil._getErrorResponse(err, response))
    .finally(() => res.status(response.status).json(response.message));
};

const _fillUpdatedMovie = function (partialUpdate, movie, req) {
  if (partialUpdate) {
    _fillPartialUpdateMovie(movie, req);
  } else {
    _fillFullUpdateMovie(movie, req);
  }
};

const _updateOneMovie = function (movie) {
  return Movie.updateOne(movie);
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  updatePartialOne,
  deleteOne,
  getPageCount,
};
