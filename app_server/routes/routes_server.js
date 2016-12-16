var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/index_server.controller');
var others_controller = require('../controllers/others_server.controller');

/* GET home page. */
router.get('/', index_controller.indexController);
router.get('/dashbord', others_controller.angularAppController);

module.exports = router;
