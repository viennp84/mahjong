//Requirement modules for the application
var express = require('express');
var router = express.Router();
//Import admin.controller service
var controller = require('../controllers/admin.controller');
//Get all user service from the controller
router.get('/getAllUsers', controller.getAllUsers);
//Get activateuser service
router.get('/getActivatedUsers', controller.getActivatedUsers);
//get Search user service
router.get('/searchForUser/:keyWord', controller.searchForUser);
//Post update password
router.post('/updatePassword', controller.updatePassword);
//Get Unactivarte users
router.get('/getUnActivateddUsers', controller.getUnActivateddUsers);
//Deactivate the unactivated the user
router.get('/deactivateAccount/:userId', controller.deactivateAccount);

module.exports = router;