const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


const usersRouter = require('./routes/users');
const luckyRouter = require('./routes/lucky');
const searchRouter = require('./routes/search');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const dashboardRouter = require('./routes/dashboard');
const windowListRouter = require('./routes/windowList');
const carsRouter = require('./routes/cars');
const vendorRouter = require('./routes/vendors')

const url = 'mongodb://localhost/social_network';


var favicon = require('serve-favicon')

const app = express();

mongoose.connect(url,{
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.locals.moment = require('moment');

app.use(
    session({
      store: new MongoStore({mongooseConnection: db}),
      name: 'sid',
      saveUninitialized: false,
      resave: false,
      secret: 'Hkjhsdf837/7392//8%2bnsdjh2"',
      cookie: {
        // 2 hours
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production'
      }
    })
);

app.use(favicon(__dirname + '/public/images/favicon.ico'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/lucky', luckyRouter);
app.use('/search', searchRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);
app.use('/windowList', windowListRouter);
app.use('/cars', carsRouter);
app.use('/vendors', vendorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;