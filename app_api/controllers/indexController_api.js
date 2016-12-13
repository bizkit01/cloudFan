var mongoose = require('mongoose');
var indexModel = mongoose.model('indexModel_api');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.indexController_api = function (req, res) {
  indexModel
  .find({})
  .exec(function(err, content) {
    if(!content) {
      sendJsonResponse(res, 404, {
        'message': 'Load index content failed'
      });
      return;
    } else if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    sendJsonResponse(res, 200, content);
  });
};
