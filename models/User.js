const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  firstName: { 
    type: String,
    required: true, 
    trim: true
  },
  lastName: { 
    type: String,
    required: true, 
    trim: true 
  },
  emailAddress: { 
    type: String,
    required: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true,
    trim: true
  }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}})

const User = mongoose.model('User', UserSchema)
module.exports = User;

module.exports.save = (newUser, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (error, hash) => {
      // store hashed password
      const newUserResource = newUser;
      newUserResource.password = hash;
      newUserResource.save(callback);
    })
  })
}

module.exports.getUserByEmail = (emailAddress, callback) => {
  const query = { emailAddress };
  User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if(err){
      throw err;
    }
    callback(null, isMatch)
  })
}