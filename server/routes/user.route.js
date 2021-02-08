//Requirement modules for the application
var express = require('express');
var router = express.Router();
//Import user.controller service
var controller = require('../controllers/user.controller');
//The user register business
router.post('/register', controller.register);
//The user login business  
router.post('/login', controller.login);
//The page get introduce for the home page
router.get('/introduce', controller.introduce);
//Get scoring data from calling the scoring business.
router.get('/scoring', controller.scoring);
//Get user profile data from calling the profile business. 
router.get('/profile/:userId', controller.profile);
//Get user profile data from calling the profile business. 
router.post('/updateProfile', controller.updateProfile);
//Upload a profile image and update database
router.post('/avatar', controller.updateAvatar);
//Get avatar image
router.get('/avatar/:name', controller.getAvatar);

module.exports = router;