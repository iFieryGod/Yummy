const Post = require('../models/Post.js');

module.exports.controller = (app) => {
  app.get('/*', (req, res, next) => {
    res.setHeader('Last-Modified', new Date().toUTCString());
    next();
  })

  
  app.get('/home', (req, res) => {
    Post.estimatedDocumentCount().exec(function (err, count) {
      let random = Math.floor(Math.random() * count)
      Post.find({}, (err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post)
    }).lean().skip(random).limit(3).exec(function (err, result) {
    })
    })
    
  });
}