var mongoose = require('mongoose');

var indexSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

mongoose.model('indexModel_api',indexSchema);
