const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// const axios = require('axios');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
const mongoose = require('mongoose');
const fs = require('fs');

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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

fs.readdirSync('controllers').forEach(function (file) {
  if(file.substr(-3) == '.js'){
    const route = require('./controllers/' + file)
    route.controller(app)
  }
})  

router.get('/', (req, res, next) => {
  res.json({ message: "API running"})
})

const port = process.env.API_PORT || 8081;

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});

module.exports = app;