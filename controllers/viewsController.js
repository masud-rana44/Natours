const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template and render the template useing that data
  res.status(200).render('overview', {
    title: 'All Tours',
    name: 'overview',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data for the requested tour
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) return next(new AppError('There is no tour with that name.', 404));

  // 2) Build the template

  // 3) Render template using the data
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create new account',
  });
};

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot your password',
  });
};

exports.getResetPasswordForm = (req, res) => {
  res.status(200).render('resetPassword', {
    title: 'Reset your password',
  });
};

exports.getResetLinkConfirmation = (req, res) => {
  res.status(200).render('confirmMsg', {
    title: 'Reset link confirmation',
    heading: 'Check Your Email',
    msg: 'We sent a varification link to your email.',
    msg2: 'Check your email & click the reset password link to continue reseting your password.',
    buttonLevel: 'Wrong email address?',
    buttonText: 'Back to login',
    url: 'login',
  });
};

exports.getPaymentConfirmation = (req, res) => {
  res.status(200).render('confirmMsg', {
    title: 'Payment status',
    heading: 'Booking complete',
    msg: 'Your booking in complete, we will connect to you soon.',
    msg2: "Go to your bookings & don't forgot to share your opinion with the world.",
    buttonLevel: 'See your bookings?',
    buttonText: 'My bookings',
    url: 'my-tours',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // NOT working virtual population here, TRY LETER!
  // const user = await User.findById(req.user.id).populate('bookings');
  // console.log(user);

  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with returned IDs
  // const tourIDs = bookings.map((el) => el.tour);
  // const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('myBookings', {
    title: 'My Tours',
    bookings,
    // tours,
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  // Find all the reviews
  const reviews = await Review.find({ user: req.user.id });
  res.status(200).render('myReviews', {
    title: 'My Reviews',
    reviews,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find();

  res.status(200).render('allBookings', {
    title: 'All Bookings',
    bookings,
  });
});
