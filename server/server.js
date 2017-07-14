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
app.post('/users', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then((user) => {
    user.generateAuthToken().then((token) => {
      res.status(200).header('x-auth', token).send(user);
    })
  }).catch((err) => {
    res.status(400).send();
  })
})
//user login
app.post('/users/login',  (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.status(200).header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(404).send();
  })
})
//user logout
app.delete('/users/:id', (req, res) => {
  var id = req.params.id;
  var token = req.header('x-auth');
  User.findById(id).then((user) => {
    user.removeToken(token).then((user) => {
      console.log(user);
      res.send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  })
})



app.listen(process.env.PORT, () => {
  console.log('server is running on port', process.env.PORT);
})