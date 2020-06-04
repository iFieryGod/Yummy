const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const fs = require('fs');
const passportJwt = require('passport-jwt');
const serveStatic = require('serve-static');
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

const app = express();
const router = express.Router();

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

app.use(morgan('combined'));
app.use(cors());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveStatic(__dirname + "/dist"));

router.get('/*', (req, res, next) => {
  res.setHeader('Last-Modified', new Date().toUTCString());
  next();
})

fs.readdirSync('controllers').forEach(function (file) {
  if(file.substr(-3) == '.js'){
    const route = require('./controllers/' + file)
    route.controller(app)
  }
}) 

const port = process.env.API_PORT || 8081;

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});

module.exports = app;