const UserSchema = require('../models/User.js');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisismysecretkey';

module.exports.controller = (app) => {
  // get request for user accounts
  app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    UserSchema.find({}, 'userName emailAddress', (error, user) => {
      if(error){
        console.log(error)
      }
      res.send({ user,
      });
    });
  });
// Login a user
  app.post('/users/login', (req, res) => {
    console.log(req)
    if(req.body.emailAddress && req.body.password) {
      const emailAddress = req.body.emailAddress;
      const password = req.body.password;
      UserSchema.getUserByEmail (emailAddress, (err, user) => {
        if(!user) {
          res.status(404).json({ message: 'The user does not exist!' });
        } else {
          console.log(user)
          UserSchema.comparePassword(password, user.password, (error, isMatch) => {
            if(error){
              throw err
            }
            console.log(isMatch)
            if(isMatch){
              const payload = { id: user.id };
              const token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({ message: 'ok', token })
            } else {
              res.status(401).json({ message: 'The password is incorrect!' });
            }
          });
        }
      });
    }
  });
// register a user
  app.post('/users', (req, res) => {
    const newUser = new UserSchema({
      userName: req.body.userName,
      firstName: req.body.firstName, 
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    })
    UserSchema.save(newUser, (err, user) => {
      if(err){
        res.status(422).json({
          message: 'Something went wrong here, PLease try again after some time!'
        })
      }
      res.send(user)
    })
  })
  // Get a specific user account details
  app.get('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    UserSchema.findById(req.params.id, 'userName firstName lastName emailAddress', (err, user) => {
      if(err){
        console.log(err)
      }
      res.send(user)
    });
  });
// delete a user account based on their user_id
  app.delete('/users/remove/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    UserSchema.remove({_id: req.params.id}, (err, user) => {
      if(err){
        console.log(err)
      }
      res.send(user)
    })
  })
// Update the properties of a specific user account in the database, this is based on their user_id 
  app.put('/users/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    UserSchema.findById(req.params.id, (err, user) => {
      if(err){
        console.error(err)
      }
      user.userName = req.body.userName,
      user.firstName = req.body.firstName,
      user.lastName = req.body.lastName,
      user.emailAddress = req.body.emailAddress,
      user.save((err, user) => {
        if(err){
          console.error(err)
        }
        res.send(user)
      });
    });
  });
}