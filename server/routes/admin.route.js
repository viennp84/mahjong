//Requirement modules for the application
var express = require('express');
var router = express.Router();
//Import admin.controller service
var controller = require('../controllers/admin.controller');
// //The user register business
// router.post('/register', controller.register);
// //The user login business  
// router.post('/login', controller.login);
// //The page get introduce for the home page
// router.get('/introduce', controller.introduce);
// //Get scoring data from calling the scoring business.
// router.get('/scoring', controller.scoring);
// //Get user profile data from calling the profile business. 
// router.get('/profile/:userId', controller.profile);
// //Get user profile data from calling the profile business. 
// router.post('/updateProfile', controller.updateProfile);
// //Upload a profile image and update database
// router.post('/avatar', controller.updateAvatar);
// //Get avatar image
// router.get('/avatar/:name', controller.getAvatar);
// //Send email via Nylas
// router.post('/invite', controller.inviteFriend);
// //Activate account
// router.post('/activate', controller.activateAccount);
// //Get friend List
// router.get('/getFriendList/:userId', controller.getFriendList);

////////////////////////////////
router.get('/getAllUsers', controller.getAllUsers);
router.get('/getActivatedUsers', controller.getActivatedUsers);
router.get('/searchForUser/:keyWord', controller.searchForUser);
router.post('/updatePassword', controller.updatePassword);

module.exports = router;