var mongoose = require('mongoose');

var indexSchema = new mongoose.Schema({
  title: String,
  navtabs: [String],
  services: [String]
});

mongoose.model('indexModel_api',indexSchema,'index');
