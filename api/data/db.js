const mongoose = require('mongoose');
const callbackify = require('util').callbackify;
require('./movie-model');
require('./users-model');

const mongooseDisconnectedCallbackify = callbackify(function () {
  return mongoose.connection.close();
});

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('connected', function () {
  console.log(process.env.DB_CONNECTED);
});

mongoose.connection.on('disconnected', function () {
  console.log(process.env.DB_DISCONNECTED);
});

mongoose.connection.on('error', function (err) {
  console.log(process.env.DB_ERROR + err);
});

process.on(process.env.SIGINT, function () {
  mongooseDisconnectedCallbackify(function () {
    console.log(process.env.DB_DISCONNECTED_CALLBACK);
    process.exit();
  });
});
