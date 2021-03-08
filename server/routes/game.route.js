//Requirement modules for the application
var express = require('express');
var router = express.Router();
//Import admin.controller service
var controller = require('../controllers/game.controller');
//Get the Game room service from the game room controller
router.get('/getGameRoom', controller.getGameRoom);
//Get the Game room service from the game room controller
router.get('/createNewGame', controller.createNewGame);
//Get the mahjong tile service from the game room controller
router.get('/getAllMahjongTiles', controller.getAllMahjongTiles);
//Get the three dice service from the game room controller
router.get('/getThreeDice', controller.getThreeDice);

module.exports = router;