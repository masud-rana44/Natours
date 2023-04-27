const AppError = require('../utils/appError');

const handleCastErrorDB = function (err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token! Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token is expired! Please log in again.', 401);

const handleDuplicateFields = function (err) {
  const value = err.errmsg.match(/"([^"]*)"/);
  const message = `Duplicate field value ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = function (err, req, res) {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) RENDER WEBSITE
  console.error('ERROR:', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = function (err, req, res) {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to the client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programmin or other wnknown error: don't leak error details
    // 1) Log error
    console.error('ERROR:', err);
    // 2) Send generic message to API
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
  // B) RESPONSE WEBSITE
  // Operational, trusted error: send message to the client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // Programmin or other wnknown error: don't leak error details
  // 1) Log error
  console.error('ERROR:', err);
  // 2) Send generic message (RESPONSE WEBSITE)
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again leter!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 1100) error = handleDuplicateFields(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
