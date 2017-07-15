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


UserSchema.statics.findByCredentials = function(email, password){
  var User = this;
  return User.findOne({email}).then((user) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
      if (res === true){
        return resolve(user);
      } else {
          return reject();
        }
      })
    })

  })
}

UserSchema.statics.findByToken = function(token){
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  User = this;
  return User.findById(decoded.id).then((user) => {
    if (!user) {
      return new Promise.reject();
    }
    return user;
  })
}
UserSchema.methods.removeToken = function(token){
  var user = this;
  return User.update({
    $pull: {
      tokens: {token}
    }
  })
}

var User = mongoose.model('User', UserSchema)


module.exports = {
  User
}