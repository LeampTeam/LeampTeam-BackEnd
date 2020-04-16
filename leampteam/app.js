var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersupload = require('./routes/upload');
var categoriaRouter = require('./routes/categoria');
var fraganciaRouter = require('./routes/fragancia');
var productoRouter = require('./routes/producto');
var comboRouter = require('./routes/combo');

const mongoose = require('mongoose');
var check=require('./middleware/checkSingIn')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var payload='Es un secreto'
console.log(payload)
mongoose.connect('mongodb://localhost:27017/almacenBackEnd', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(session({
  secret: payload,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection:mongoose.connection,
    autoRemove: 'native',
    ttl: 24 * 60 * 60
  }),
  cookie: { 
    maxAge: 24*3600000,
    httpOnly: true,
    secure: false,
    sameSite:"lax",
    path:'/'

   },
   rolling:true
}));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', usersupload);
app.use('/categoria', categoriaRouter);
app.use('/fragancia', fraganciaRouter);
app.use('/producto', productoRouter);
app.use('/combo', comboRouter);
app.get('/',check.checkSignInLogin,function(req,res){
  

  
res.render('home')
});

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
