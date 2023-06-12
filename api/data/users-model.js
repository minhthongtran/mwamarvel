const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

mongoose.model(process.env.USERS_MODEL, userSchema, process.env.USERS_COLLECTION);
