const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARE
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

// custom
app.use((req, res, next) => {
  console.log('Hello form the middleware😍');
  next();
});

app.use((req, res, next) => {
  req.createdAt = new Date().toISOString();
  next();
});

// ROUTES (Mounting)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
