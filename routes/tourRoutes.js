const express = require('express');
const {
  getTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  topToursAlieas,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');

const router = express.Router();

// Perameter middleware
// router.param('id', checkId);

router.route('/top-5-cheap').get(topToursAlieas, getTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(getTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
