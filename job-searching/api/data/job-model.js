const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  name: String,
});
const jobsSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  salary: Number,
  location: locationSchema,
  description: String,
  experience: Number,
  skill: [String],
  postDate: Date,
  password: String,
});

mongoose.model(process.env.JOB_MODEL, jobsSchema, process.env.JOB_COLLECTIONS);
