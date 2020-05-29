const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors');
const bodyParser = require('body-parser');
// const axios = require('axios');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
// connecting to mongodb
mongoose.connect('mongodb://localhost/Yummy', 
{ useNewUrlParser: true, 
useUnifiedTopology: true }, 
  function () {
    console.log('connection has been established');
  }).catch((err) => {
    console.log('Mongodb connection error:',
    err.stack)
    process.exit(1);
  })
// view engine setup
app.set('view', path.join(__dirname, 'views'));
app.set('view engine', 'vue');

app.use(morgan('combined'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.API_PORT || 8081;

app.listen(3000, () => {
  console.log(`server is running on port ${port}`)
});

module.exports = app;