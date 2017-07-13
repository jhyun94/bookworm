require('./config/config');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');

var mongoose = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//create new user
app.post('/users/new', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then((user) => {
    res.send(user);
  }).catch((err) => {
    res.status(400).send(err);
  })
  // res.redirect('/index.html')
})





app.listen(process.env.PORT, () => {
  console.log('server is running on port', process.env.PORT);
})