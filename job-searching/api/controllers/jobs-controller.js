const { response } = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Jobs = mongoose.model(process.env.JOB_MODEL);

const getAll = function (req, res) {
  let offset = parseFloat(process.env.DEFAULT_OFFSET, 10);
  let count = parseFloat(process.env.DEFAULT_COUNT, 10);
  let query = {};
  if (req.query.offset) {
    offset = req.query.offset;
  }
  if (req.query.count) {
    count = req.query.count;
  }
  if (req.query.search) {
    query = { 'location.name': req.query.search };
  }
  let response = _initResponse(process.env.HTTP_STATUS_CODE_SUCCESS);
  console.log(query);
  Jobs.find(query)
    .sort('title')
    .skip(offset)
    .limit(count)
    .sort('location')
    .exec()
    .then((jobs) => _getSuccessResponse(jobs, response))
    .catch((err) => _getErrorResponse(err, response))
    .finally(() => {
      _sendResponse(res, response);
    });
};

const addOne = function (req, res) {
  let newJob = {
    title: req.body.title,
    salary: req.body.salary,
    location: req.body.location,
    description: req.body.description,
    experience: req.body.experience,
    skill: req.body.skill,
    postDate: req.body.postDate,
    password: req.body.password,
  };
  let response = _initResponse(process.env.HTTP_STATUS_CODE_CREATE);
  Jobs.create(newJob)
    .then((job) => _getSuccessResponse(job, response))
    .catch((err) => _getErrorResponse(err, response))
    .finally(() => {
      _sendResponse(res, response);
    });
};

const deleteOne = function (req, res) {
  const jobId = req.params.jobId;
  let response = _initResponse(process.env.HTTP_STATUS_CODE_DELETE);
  Jobs.findByIdAndDelete(jobId)
    .exec()
    .then((deletedJob) => {
      if (deletedJob) {
        _getDeleteResponse(deletedJob, response);
      } else {
        _getNotFoundResponse(process.env.JOB_NOT_FOUND_MESSAGE, response);
      }
    })
    .catch((err) => {
      console.log(err);
      _getErrorResponse(err, response);
    })
    .finally(() => _sendResponse(res, response));
};

const updateOne = function (req, res) {
  const updatedJob = Jobs({
    title: req.body.title,
    salary: req.body.salary,
    location: req.body.location,
    description: req.body.description,
    experience: req.body.experience,
    skill: req.body.skill,
    postDate: req.body.postDate,
  });
  let response = _initResponse(process.env.HTTP_STATUS_CODE_SUCCESS);
  const jobId = req.params.jobId;
  console.log('JobId : ' + jobId);
  Jobs.findById(jobId)
    .exec()
    .then((existedJob) => _checkExistedJob(existedJob))
    .then((foundJob) => _fullUpdateOne(req, foundJob))
    .then((updatedJob) => _getSuccessResponse(updatedJob, response))
    .catch((err) => {
      console.log(err);
      _getErrorResponse(err, response);
    })
    .finally(() => _sendResponse(res, response));
};

const _checkExistedJob = function (existedJob) {
  return new Promise((resolve, reject) => {
    if (existedJob) {
      resolve(existedJob);
    } else {
      reject(process.env.JOB_NOT_FOUND_MESSAGE);
    }
  });
};
const _initResponse = function (status) {
  return {
    status: parseInt(status),
    message: {},
  };
};

const _fullUpdateOne = function (req, foundJob) {
  foundJob.title = req.body.title;
  foundJob.salary = req.body.salary;
  return foundJob.save();
};

const _fillPassword = function (password, foundJob) {
  foundJob.password = password;
  return foundJob.save();
};

const _encryptPassword = function (foundJob) {
  console.log(foundJob);
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(12)
      .then((salt) => _generateHash(foundJob.password, salt))
      .then((passwordHash) => resolve(_fillPassword(passwordHash, foundJob)))
      .catch((error) => reject(error));
  });
};

const _generateHash = function (password, salt) {
  return bcrypt.hash(password, salt);
};

const encryptPassword = function (req, res) {
  const jobId = req.params.jobId;
  let response = _initResponse(process.env.HTTP_STATUS_CODE_SUCCESS);
  Jobs.findById(jobId)
    .exec()
    .then((existedJob) => _checkExistedJob(existedJob))
    .then((foundJob) => _encryptPassword(foundJob))
    .then((updatedJob) => _getSuccessResponse(updatedJob, response))
    .catch((err) => {
      console.log(err);
      _getErrorResponse(err, response);
    })
    .finally(() => _sendResponse(res, response));
};

const totalJobs = function (req, res) {
  const state = req.query.state;
  let query = {};
  if (state) {
    query = { 'location.name': state };
  }
  let response = _initResponse(process.env.HTTP_STATUS_CODE_SUCCESS);
  Jobs.find(query)
    .count()
    .then((count) => _getSuccessResponse(count, response))
    .catch((err) => _getErrorResponse(err))
    .finally(() => _sendResponse(res, response));
};

const _getSuccessResponse = function (message, response) {
  response.status = parseInt(process.env.HTTP_STATUS_CODE_SUCCESS);
  response.message = message;
};

const _getErrorResponse = function (message, response) {
  response.status = parseInt(process.env.HTTP_STATUS_CODE_ERROR);
  response.message = message;
};

const _getNotFoundResponse = function (message, response) {
  response.status = parseInt(process.env.HTTP_STATUS_CODE_NOT_FOUND);
  response.message = message;
};

const _getDeleteResponse = function (message, response) {
  response.status = parseInt(process.env.HTTP_STATUS_CODE_DELETE);
  response.message = message;
};

const _sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};
module.exports = {
  getAll,
  addOne,
  deleteOne,
  updateOne,
  encryptPassword,
  totalJobs,
};
