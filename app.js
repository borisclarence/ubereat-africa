var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var commandRouter = require('./routes/command');
var homeRouter = require('./routes/home');
var footerRouter = require('./routes/footer');
var navbarRouter = require('./routes/navbar');
var livraisonRouter = require('./routes/livraison');
var restaurantRouter = require('./routes/restaurant');
var settingsRouter = require('./routes/settings');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', registerRouter);
app.use('/command', commandRouter);
app.use('/home', homeRouter);
app.use('/livraison', livraisonRouter);
app.use('/restaurant', restaurantRouter);
app.use('/settings', settingsRouter);
app.use('/users', usersRouter);

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
