require('./config/config');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');

var mongoose = require('./db/mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/users/new', (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  
  res.redirect('/index.html')
})





app.listen(process.env.PORT, () => {
  console.log('server is running on port', process.env.PORT);
})