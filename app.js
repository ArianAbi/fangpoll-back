var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signup = require('./routes/signup');
var pollsListRouter = require('./routes/pollsList');
var createPoll = require('./routes/createPoll');
var pollPage = require('./routes/pollPage');
var pollSubmit = require('./routes/pollSubmit');
var pollVotes = require('./routes/pollVotes');
var editPoll = require('./routes/editPoll');
var pollDelete = require('./routes/pollDelete');
var authenticate = require('./authenticate');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signup)
app.use('/pollsList', authenticate, pollsListRouter)
app.post('/isLogged', authenticate, (req, res) => {

  //const user = (JSON.parse(JSON.parse(req.headers.user)))
  const user = (JSON.parse(JSON.parse(req.headers.user)))

  res.status(200).json({ username: user.username })
})
app.use('/createPoll', authenticate, createPoll)
app.use('/editPoll', authenticate, editPoll)
app.use('/pollDelete', authenticate, pollDelete);
app.use('/pollPage', pollPage)
app.use('/pollSubmit', pollSubmit)
app.use('/pollVotes', pollVotes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
