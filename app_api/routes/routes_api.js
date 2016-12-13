var express = require('express');
var router = express.Router();
var indexCtrl_api = require('../controllers/indexController_api');

router.get('',indexCtrl_api.indexController_api);

module.exports = router;
