//Requirement modules for the application
var express = require('express');
var router = express.Router();
//Import admin.controller service
var controller = require('../controllers/game.controller');


////////////////////////////////
router.get('/getGameRoom', controller.getGameRoom);
router.get('/createNewGame', controller.createNewGame);
router.get('/getAllMahjongTiles', controller.getAllMahjongTiles);



module.exports = router;