const mongoose = require('mongoose')

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
})

const User = mongoose.model('User', UserSchema)
module.exports = User