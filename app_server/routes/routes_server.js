var express = require('express');
var router = express.Router();
var indexCtrl_server = require('../controllers/indexController_server');

/* GET home page. */
router.get('/', indexCtrl_server.indexController_server);

module.exports = router;
