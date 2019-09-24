var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();
app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/guest'),
                  path.join(__dirname, 'views/user'),
                  path.join(__dirname, 'views/general')]);
app.set('view engine', 'ejs');
var con = mysql.createConnection({
  database: "yourtests",
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
global.db = con;
app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/logout', indexRouter);
app.use('/login', indexRouter);
app.use('/register', indexRouter);
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
