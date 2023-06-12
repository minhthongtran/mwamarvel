const express = require('express');
require('dotenv').config();
require('./api/data/data');
const router = require('./api/routers');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  next();
});
app.use('/api', router);

const server = app.listen(process.env.PORT, function () {
  console.log('App is listenning on PORT ' + server.address().port);
});
