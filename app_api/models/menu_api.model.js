var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
  menu: Object
});

// var categorySchema = new mongoose.Schema({
//   categoryId: String,
//   categoryName: String
//   meals: [mealSchema]
// });
//
// var mealSchema = new mongoose.Schema({
//   mealId: String,
//   mealName: String,
//   mealPrice: String
// });

mongoose.model('menuModel_api', menuSchema, 'menus');
