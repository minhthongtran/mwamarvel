const _getDeleteSuccessResponse = function (message, res) {
  res.status = parseInt(process.env.HTTP_DELETE_STATUS_CODE);
  res.message = message;
};

const _getSuccessResponse = function (message, res) {
  res.status = parseInt(process.env.HTTP_SUCCESS_STATUS_CODE);
  res.message = message;
};

const _getErrorResponse = function (message, res) {
  res.status = parseInt(process.env.HTTP_INTERNAL_ERROR_STATUS_CODE);
  res.message = message;
};

const _getNotFoundResponse = function (message, res) {
  res.status = parseInt(process.env.HTTP_NOT_FOUND_STATUS_CODE);
  res.message = message;
};

const _initResponse = function () {
  return {
    status: parseInt(process.env.HTTP_SUCCESS_STATUS_CODE),
    message: {},
  };
};

const _getSuccesAndNotFoundReponse = function (data, message, res) {
  if (data) {
    _getSuccessResponse(data, res);
  } else {
    _getNotFoundResponse(message, res);
  }
};

const _checkExistedData = function (data, message) {
  return new Promise((resolve, reject) => {
    if (data) {
      resolve(data);
    } else {
      reject(message);
    }
  });
};

module.exports = {
  _initResponse,
  _getNotFoundResponse,
  _getErrorResponse,
  _getSuccessResponse,
  _getDeleteSuccessResponse,
  _getSuccesAndNotFoundReponse,
  _checkExistedMovie,
};
