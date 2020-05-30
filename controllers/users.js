const UserSchema = require('../models/User.js');

module.exports.controller = (app) => {
  app.post('/users', (req, res) => {
    const newUser = new UserSchema({
      userName: req.body.userName,
      firstName: req.body.firstName, 
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    })
    newUser.save((err, user) => {
      if(err){
        console.log(err)
      }
      res.send(user)
    })
  })
}