const express = require('express');
const jobsController = require('../controllers/jobs-controller');

const router = express.Router();

router.route('/jobs').get(jobsController.getAll).post(jobsController.addOne);
router.route('/jobs/:jobId').put(jobsController.updateOne).delete(jobsController.deleteOne);
router.route('/jobs/:jobId/encrypt').put(jobsController.encryptPassword);
router.route('/jobs/total').get(jobsController.totalJobs);

module.exports = router;
