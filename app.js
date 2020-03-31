var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql=require('mysql');
var session=require('express-session')
var fromidable=require('formidable')
var fs=require('fs')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var con=require('./lib/connection')
var adminRouter=require('./routes/admin');
var streamRouter=require('./routes/stream');
var classRouter=require('./routes/classmaster');
var departmentRouter=require('./routes/department.js')
var teacherRouter=require('./routes/teacher.js')

var app = express();
var session=require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'vysakh',
  resave: false,
  saveUninitialized: false,
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/stream', streamRouter);
app.use('/classmaster',classRouter);
app.use('/department',departmentRouter);
app.use('/teacher',teacherRouter);
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

app.listen(3000,function(req,res){
	console.log("connected to 3000")
});
module.exports = app;

