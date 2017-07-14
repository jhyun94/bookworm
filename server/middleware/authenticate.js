var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  User.findOne({email: req.body.email}).then((user) => {
    
  }).catch((e) => {
    res.status(404).send();
  })
}