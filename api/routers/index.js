const express = require('express');
const moviesController = require('../controllers/moviesController');
const actorController = require('../controllers/actorController');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.route('/movies').get(moviesController.getAll).post(moviesController.createOne);

router
  .route('/movies/:movieId')
  .get(moviesController.getOne)
  .put(moviesController.updateOne)
  .delete(moviesController.deleteOne)
  .patch(moviesController.updatePartialOne);

router.route('/movies/:movieId/actors').get(actorController.getAll).post(actorController.addOne);
router
  .route('/movies/:movieId/actors/:actorId')
  .get(actorController.getOne)
  .delete(actorController.deleteOne)
  .put(actorController.updateOne) //fullUpdate
  .patch(actorController.updateParitalOne); //partialUpdate

router.route('/movies/paginate/count').get(moviesController.getPageCount);

router.route('/users').post(usersController.register);

router.route('/users/login').post(usersController.login);
module.exports = router;
