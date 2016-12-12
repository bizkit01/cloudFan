var mongoose = require('mongoose');

var homepageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

mongoose.model('homepage',homepageSchema);
