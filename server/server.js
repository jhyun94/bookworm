require('./config/config');
var express = require('express');
var path = require('path');

var mongoose = require('./db/mongoose');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));





app.listen(process.env.PORT, () => {
  console.log('server is running on port', process.env.PORT);
})