const PostSchema = require('../models/Post.js');
const crypto = require('crypto');
const path = require('path');
const passport = require('passport');

const multer = require('multer');

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpg', 'image/png', 'image/jpeg'];
  if(!allowedTypes.includes(file.mimetype)){
    const error = new Error("incorrect file");
    error.code = 'INCORRECT_FILETYPE!';
    return cb(error, false)
  }
  cb(null, true)
}  

const upload = multer.diskStorage({
  destination: './src/assets',
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return callback(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

module.exports.controller = (app) => {
// Multer Middleware for single image upload
app.use(multer({storage: upload, fileFilter: fileFilter, limits: {
  fileSize: 5000000
}}).single('img'));
// create a blog post and add it to the database
  app.post('/posts', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.file)
    const newPost = new PostSchema({
      title: req.body.title,
      description: req.body.description,
      img: req.file.filename
    })
    newPost.save((err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post)
    });
  });
// get all the posts in the database
  app.get('/posts', (req, res) => {
    PostSchema.find({}, (err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post);
    });
  });
// Get a specific blog post based on post_id
  app.get('/task/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    PostSchema.findById(req.params.id, 'title description img', (err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post)
    });
  });
// Update the contents of a specific post based on post_id
  app.put('/task/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    PostSchema.findById(req.params.id, (err, post) => {
      if(err){
        console.log(err)
      }
      post.title = req.body.title,
      post.description = req.body.description,
      post.img = req.file.filename
      post.save((err, post) => {
        if(err){
          console.log(err)
        }
        res.send(post)
      });
    });
  });
// Delete a specific post from the application and the database
  app.delete('/task/remove/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    PostSchema.deleteOne({_id: req.params.id}, (err, post) => {
      if(err){
        console.log(err)
      }
      res.send(post)
    })
  })

  app.use((err, req, res, next) => {
    if(err.code === "INCORRECT_FILETYPE"){
      res.status(422).json({error: 'Only images are allowed'});
      return
    }
    if(err.code === "LIMIT_FILE_SIZE"){
      res.status(422).json({error: 'Allowed file size is 5mb'});
      return
    }
  })
}