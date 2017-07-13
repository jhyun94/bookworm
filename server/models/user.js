const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

UserSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, function(err, hash){
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})


var User = mongoose.model('User', UserSchema)


module.exports = {
  User
}