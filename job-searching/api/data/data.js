const mongoose = require('mongoose');
require('./job-model');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected!');
});

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB disconnected');
});
