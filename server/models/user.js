const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
  email: {
    required: true,
    trim: true,
    unique: true,
    type: String
    validate: (value) => {
      return validator.isEmail(value);
    },
    message: `{VALUE} is not a valid email` 
  },
  password: {
    required: true,
    type: String,
  },
  tokens: [{
    token: {
      required: true
    },
    auth: {
      required: true
    }
  }]
})

var User = mongoose.model('User', UserSchema)

module.exports = {
  User
}