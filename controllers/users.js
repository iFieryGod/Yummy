const UserSchema = require('../models/User.js');

module.exports.controller = (app) => {
  app.get('/users', (req, res) => {
    UserSchema.find({}, 'userName emailAddress', (error, user) => {
      if(error){
        console.log(error)
      }
      res.send({ user,
      });
    });
  });

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
  
  app.get('/users/:id', (req, res) => {
    UserSchema.findById(req.params.id, 'userName firstName lastName emailAddress', (err, user) => {
      if(err){
        console.log(err)
      }
      res.send(user)
    });
  });

  app.delete('/users/remove/:id', (req, res) => {
    UserSchema.remove({_id: req.params.id}, (err, user) => {
      if(err){
        console.log(err)
      }
      res.send(user)
    })
  })

  app.put('/users/:id', (req, res) => {
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