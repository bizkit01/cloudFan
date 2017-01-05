var mongoose = require('mongoose');
var menuModel = mongoose.model('menuModel_api');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.menuFindController_api = function (req, res) {
  menuModel
    .find(
      {},
      function (err, menu) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 200, menu);
        }
      }
    );
};

module.exports.menuCreatController_api = function (req, res) {
  menuModel
    .create(
      {
        menu: req.body.menu
      },
      function (err, menu) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 200, menu);
        }
      }
    );
};
