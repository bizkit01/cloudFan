var express = require('express');
var router = express.Router();
var indexCtrl_api = require('../controllers/index_api.controller');
var menuCtrl_api = require('../controllers/menu_api.controller');

router.get('/index',indexCtrl_api.indexController_api);
router.get('/menus',menuCtrl_api.menuFindController_api);
router.post('/menus',menuCtrl_api.menuCreatController_api);

module.exports = router;
