const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const db = require('./config/keys').MongoURI;

// Passport config

require('./config/passport')(passport)



// Connect to Mongo
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session 

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  // cookies: { secure: false }
}))

// Password middleware

app.use(passport.initialize());
app.use(passport.session());

// Connect flash

app.use(flash());


// Global Vars

app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// whole use

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.erroro = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('erroro');
});

module.exports = app;
