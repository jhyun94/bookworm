const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
    access: {
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

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({id: user._id.toHexString(), access}, process.env.JWT_SECRET);

  user.tokens.push({token, access});
  return user.save().then((user) => {
    return token
  })
}

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['email', '_id']);
}
var User = mongoose.model('User', UserSchema)


module.exports = {
  User
}