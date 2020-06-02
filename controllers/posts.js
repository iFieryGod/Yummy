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
    });
  });

  app.get('/posts', (req, res) => {
    PostSchema.find({}, (err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post);
    });
  });

  app.get('/task/:id', (req, res) => {
    PostSchema.findById(req.params.id, 'title description', (err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post)
    });
  });

  app.put('/task/:id', (req, res) => {
    PostSchema.findById(req.params.id, (err, post) => {
      if(err){
        console.log(err)
      }
      post.title = req.body.title,
      post.description = req.body.description,
      post.save((err, post) => {
        if(err){
          console.log(err)
        }
        res.send(post)
      });
    });
  });

  app.delete('/task/remove/:id', (req, res) => {
    PostSchema.remove({_id: req.params.id}, (err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post)
    })
  })
}