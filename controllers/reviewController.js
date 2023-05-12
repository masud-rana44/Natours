const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// exports.isReviewAvailable = catchAsync(async (req, res, next) => {
//   const bookings = await Booking.find({
//     tour: req.body.tour,
//     user: req.body.user,
//   });

//   bookings.forEach(async (booking) => {
//     if (!booking.reviewed) {
//       booking.reviewed = true;
//       await booking.save();
//       return next();
//     }
//   });

//   return next(new AppError('No available review belonging to this tour!', 404));
// });

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOnde(Review);
exports.deleteReview = factory.deleteOne(Review);
