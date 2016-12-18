var express = require('express');
var router = express.Router();
var indexCtrl_api = require('../controllers/index_api.controller');

router.get('/index',indexCtrl_api.indexController_api);

module.exports = router;
