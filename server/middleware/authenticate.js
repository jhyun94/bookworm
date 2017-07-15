var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    req.token = token;
    req.user = user;
    next();
  }).catch((e) => {
    res.status(404).send();
  })
}

module.exports = {
  authenticate
}