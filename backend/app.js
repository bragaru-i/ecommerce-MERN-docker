const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');

// Error handlers and error creators

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Importing routes
const productRoutes = require('./routes/productRoutes');

// setting cors
app.use(cors('*'));

// Morgan-> display logs in dev mode
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// setting helmet
app.use(helmet());
app.use(express.json());

// ==========>> Apply routes  to server
app.use('/products', productRoutes);

// GLobal error handling
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find requested path: ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
