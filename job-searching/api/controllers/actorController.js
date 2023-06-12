const mongoose = require('mongoose');
const callbackify = require('util').callbackify;
const responseUtil = require('../util/responseUtil');

const Movie = mongoose.model(process.env.MOVIE_MODEL);

const mongooseGetAllActorsCallbackify = callbackify(function (movieId) {
  return Movie.findById(movieId).select(process.env.ACTOR_DOC).exec();
});

const mongooseAddOneCallbackify = callbackify(function (movieId) {
  return Movie.findById(movieId).exec();
});

const mongooseSaveMovieActorCallbackify = callbackify(function (movie) {
  return movie.save();
});

const mongooseGetOneCallbackify = callbackify(function (movieId) {
  return Movie.findById(movieId).select(process.env.ACTOR_DOC).exec();
});

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
    responseUtil.responseWithStatusCodeAndMessage(
      process.env.HTTP_BAD_REQUEST_STATUS_CODE,
      process.env.ERROR_QUERY_OFFSET_COUNT_MESSAGE
    );
    return;
  }
  if (count > maxCount) {
    responseUtil.responseWithStatusCodeAndMessage(
      process.env.HTTP_BAD_REQUEST_STATUS_CODE,
      process.env.process.env.ERROR_MAXCOUNT_MESSAGE + maxCount
    );
    return;
  }
  let movieId = req.params.movieId;
  mongooseGetAllActorsCallbackify(movieId, offset, count, function (err, actors) {
    responseUtil.getResponse(res, process.env.HTTP_SUCCESS_STATUS_CODE, err, actors);
  });
};

const getOne = function (req, res) {
  let movieId = req.params.movieId;
  let actorId = req.params.actorId;
  mongooseGetOneCallbackify(movieId, function (err, movie) {
    responseUtil.getResponse(
      res,
      process.env.ERROR_ACTOR_ID_NOT_FOUNT_MEESAGE,
      movie.actors.id(actorId),
      process.env.ERROR_ACTOR_ID_NOT_FOUNT_MEESAGE
    );
  });
};

const deleteOne = function (req, res) {
  let movieId = req.params.movieId;
  let actorId = req.params.actorId;
  mongooseGetOneCallbackify(movieId, function (err, movie) {
    let deleteActor = movie.actors.id(actorId);
    let response = responseUtil.getResponseWithStatusCodeAndMessage(
      process.env.HTTP_DELETE_STATUS_CODE,
      deleteActor
    );
    if (err) {
      response = responseUtil.getResponseWithStatusCodeAndMessage(
        process.env.HTTP_INTERNAL_ERROR_STATUS_CODE,
        err
      );
    } else if (!movie) {
      response = responseUtil.responseWithStatusCodeAndMessage(
        process.env.HTTP_NOT_FOUND_STATUS_CODE,
        process.env.ERROR_MOVIE_ID_NOT_FOUNT_MEESAGE
      );
    } else if (!deleteActor) {
      response = responseUtil.responseWithStatusCodeAndMessage(
        process.env.HTTP_NOT_FOUND_STATUS_CODE,
        process.env.ERROR_ACTOR_ID_NOT_FOUNT_MEESAGE
      );
    }
    if (movie && deleteActor) {
      response.message = deleteActor.deleteOne();
      mongooseSaveMovieActorCallbackify(movie, function (err, movie) {
        responseUtil.getResponse(res, process.env.HTTP_SUCCESS_STATUS_CODE, err, movie);
      });
    } else {
      responseUtil.responseWithStatusCodeAndMessage(response.statusCode, response.message);
    }
  });
};

const addOne = function (req, res) {
  let movieId = req.params.movieId;
  mongooseAddOneCallbackify(movieId, function (err, movie) {
    let response = responseUtil.getResponseWithStatusCodeAndMessage(
      process.env.HTTP_SUCCESS_STATUS_CODE,
      movie
    );
    if (err) {
      response = responseUtil.getResponseWithStatusCodeAndMessage(
        process.env.HTTP_INTERNAL_ERROR_STATUS_CODE,
        err
      );
    } else if (!movie) {
      response = responseUtil.getResponseWithStatusCodeAndMessage(
        process.env.HTTP_NOT_FOUND_STATUS_CODE,
        process.env.ERROR_MOVIE_ID_NOT_FOUNT_MEESAGE
      );
    }
    if (movie) {
      _addActor(req, res, movie);
    } else {
      responseUtil.responseWithStatusCodeAndMessage(response.statusCode, response.message);
    }
  });
};

const _addActor = function (req, res, movie) {
  let newActor = {
    name: req.body.name,
    gender: req.body.gender,
    roles: req.body.roles,
  };
  movie.actors.push(newActor);

  mongooseSaveMovieActorCallbackify(movie, function (err, updatedMovie) {
    responseUtil.getResponse(res, process.env.HTTP_CREATE_STATUS_CODE, err, updatedMovie);
  });
};

const updateOne = function (req, res) {
  let movieId = req.params.movieId;
  let actorId = req.params.actorId;
  mongooseGetOneCallbackify(movieId, function (err, movie) {
    let response = responseUtil.getResponseWithStatusCodeAndMessage(
      process.env.HTTP_SUCCESS_STATUS_CODE,
      movie.actors.id(actorId)
    );
    if (err) {
      response = responseUtil.getResponseWithStatusCodeAndMessage(
        process.env.HTTP_INTERNAL_ERROR_STATUS_CODE,
        err
      );
    } else if (!movie) {
      response = responseUtil.getResponseWithStatusCodeAndMessage(
        process.env.HTTP_NOT_FOUND_STATUS_CODE,
        process.env.ERROR_ACTOR_ID_NOT_FOUNT_MEESAGE
      );
    }
    if (movie) {
      let updateActor = movie.actors.id(actorId);
      updateActor.name = req.body.name;
      updateActor.gender = req.body.gender;
      updateActor.roles = req.body.roles;

      mongooseSaveMovieActorCallbackify(movie, function (err, updatedMovie) {
        responseUtil.getResponse(
          res,
          process.env.HTTP_SUCCESS_STATUS_CODE,
          err,
          updatedMovie,
          process.env.ERROR_MOVIE_ID_NOT_FOUNT_MEESAGE
        );
      });
    } else {
      res.status(response.statusCode).json(response.message);
    }
  });
};

const updateParitalOne = function (req, res) {
  let movieId = req.params.movieId;
  let actorId = req.params.actorId;
  mongooseGetOneCallbackify(movieId, function (err, movie) {
    let response = responseUtil.getResponseWithStatusCodeAndMessage(
      process.env.HTTP_SUCCESS_STATUS_CODE,
      movie.actors.id(actorId)
    );
    if (err) {
      response = responseUtil.getResponseWithStatusCodeAndMessage(
        process.env.HTTP_INTERNAL_ERROR_STATUS_CODE,
        err
      );
    } else if (!movie) {
      response = responseUtil.getResponseWithStatusCodeAndMessage(
        process.env.HTTP_NOT_FOUND_STATUS_CODE,
        process.env.ERROR_ACTOR_ID_NOT_FOUNT_MEESAGE
      );
    }
    if (movie) {
      let updateActor = movie.actors.id(actorId);
      if (req.body.name) {
        updateActor.name = req.body.name;
      }
      if (req.body.gender) {
        updateActor.gender = req.body.gender;
      }
      if (req.body.roles) {
        updateActor.roles = req.body.roles;
      }

      mongooseSaveMovieActorCallbackify(movie, function (err, updatedMovie) {
        responseUtil.getResponse(
          res,
          process.env.HTTP_SUCCESS_STATUS_CODE,
          err,
          updatedMovie,
          process.env.ERROR_MOVIE_ID_NOT_FOUNT_MEESAGE
        );
      });
    } else {
      res.status(response.statusCode).json(response.message);
    }
  });
};

module.exports = {
  getOne,
  getAll,
  addOne,
  updateOne,
  updateParitalOne,
  deleteOne,
};
