const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  author: {
    required: true,
    type: String
  },
  favorite: {
    default: false,
    type: Boolean
  },
  status: {
    type: String,
    default: 'Not Started'
  }
})

var Book = mongoose.model('Book', BookSchema);

module.exports = {
  Book
}
