const PostSchema = require('../models/Post.js');

module.exports.controller = (app) => {
  app.post('/posts', (req, res) => {
    const newPost = new PostSchema({
      title: req.body.title,
      description: req.body.description
    })
    newPost.save((err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post)
    })
  })
}