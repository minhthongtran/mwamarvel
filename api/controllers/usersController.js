const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model(process.env.USERS_MODEL);

const addOne = function (req, res) {
  let newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  const response = _initResponse();
  User.create(newUser)
    .then((newUser) => {
      _getSuccessResponse(newUser, response);
    })
    .catch((err) => {
      _getErrorResponse(err, response);
    })
    .finally(() => {
      res.status(response.status).json(response.message);
    });
};

const login = function (req, res) {
  const response = _initResponse();
  let query = {
    username: req.body.username,
    password: req.body.password,
  };
  if (req.body && req.body.username && req.body.password) {
    User.findOne({ username: req.body.username })
      .then((foundUser) => {
        dbPassword = foundUser.password;
        requestPassword = req.body.password;
        console.log('DB Password: ' + dbPassword + ' - Request Password: ' + req.body.password);
        //let passwordsMatch = bcrypt.compareSync(requestPassword, dbPassword);
        if (dbPassword === requestPassword) {
          _getSuccessResponse(foundUser, response);
        } else {
          _getBadRequestResponse('Password does not match!', response);
        }
      })
      .catch((err) => {
        _getErrorResponse(err, response);
      })
      .finally(() => {
        res.status(response.status).json(response.message);
      });
  } else {
    //set and send response
  }
};

const _getSuccessResponse = function (message, res) {
  res.status = parseInt(process.env.HTTP_SUCCESS_STATUS_CODE);
  res.message = message;
};

const _getBadRequestResponse = function (message, res) {
  res.status = parseInt(process.env.HTTP_BAD_REQUEST_STATUS_CODE);
  res.message = message;
};

const _getErrorResponse = function (message, res) {
  res.status = parseInt(process.env.HTTP_INTERNAL_ERROR_STATUS_CODE);
  res.message = message;
};

const _initResponse = function () {
  return {
    status: parseInt(process.env.HTTP_SUCCESS_STATUS_CODE),
    message: {},
  };
};

module.exports = {
  register: addOne,
  login,
};
