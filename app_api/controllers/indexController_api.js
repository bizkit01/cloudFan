var mongoose = require('mongoose');
var indexModel = mongoose.model('indexModel_api')

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.indexController_api = function (req, res) {
  sendJsonResponse(res, 200, {'status': 'success'});
};
