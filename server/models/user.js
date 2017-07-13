const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
  email: {
    required: true,
    trim: true,
    unique: true,
    type: String,
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
      type: String,
      required: true
    },
    auth: {
      type: String,
      required: true
    }
  }]
})

var User = mongoose.model('User', UserSchema)

module.exports = {
  User
}