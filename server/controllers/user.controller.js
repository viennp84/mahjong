//Import Encryption package
const bcrypt = require("bcrypt");
const str = require('@supercharge/strings')

const saltRounds = 10;
//Import database package from db.js
var db = require('../db');
const multer = require('multer');
const imageUploader = multer({ dest: 'images/' })
const fs = require('fs');
const path = require('path');
var user= require('../models/user')
const Nylas = require('nylas');
 
Nylas.config({
  clientId: 'a99j160a1ljrkqzyoniepby5m',
  clientSecret: 'anwbglb30gg8q36riits3s1j6',
});


/*Register business service, checking if the username or email already exist on the database.
Insert register data into the users table*/
module.exports.register = function (req, res) {
  //Retrieve data from the request and assign value to the variables
  const firstname = req.body.user.firstname;
  const lastname = req.body.user.lastname;
  const email = req.body.user.email;
  const phone = req.body.user.phone;
  const username = req.body.user.username;
  const password = req.body.user.password;
  const role = 0;
  const isActivated = 0;
  const activationCode = str.random(6) 
  //Checking if the username is exist on database
  db.query("SELECT username FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    //email was taken, cannot use the same email for another account
    if (result.length > 0) {
      res.send({ message: "duplicatedEmail" })
    } else {
      //Checking if the username is taken by another user
      db.query("SELECT username FROM users WHERE username = ?", [username], (err, result) => {
        if (err) {
          res.send({ err: err })
        }
        if (result.length > 0) {
          res.send({ message: "duplicatedUsername" })
        } else {
          //Encrypt password to insert password into the database
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              console.log(err);
            }
            //Execute insert data into the users table in the database
            db.query("INSERT INTO users (email, phone, username, password, role, isActivated, firstname, lastname, image, activationCode) VALUES (?,?,?,?,?,?,?,?,?,?)",
              [email, phone, username, hash, role, isActivated, firstname, lastname,"images/default.jpg", activationCode], (err, result) => {
                if (err) {
                  res.send({ err: err })
                }
                //initiate new user game data.
                if (result.affectedRows > 0) {
                  db.query("INSERT INTO userinfo (userId, score, wonGames, totalGames) VALUES (?,?,?,?)",
                    //take the lastest inserted userId to use for another foreign key.
                    [result.insertId, 0, 0, 0], (err, result) => {
                      if (err) {
                        res.send({ err: err })
                      }
                    });
                  console.log("User Id:- " + result.insertId);
                  console.log(activationCode);
                    const nylas = Nylas.with('ko6HJh3damo7ZJC4IBBX8wLpOOFl9V');
                    const draft = nylas.drafts.build({
                      subject: 'Mahjong Account Activation Code',
                      to: [{ name: firstname, email: email }],
                      body: 'Hi, ' + firstname + '. Thank you for signing up with Mahong game. Please use this code: ' + activationCode + ' and User ID: ' + result.insertId + ' to activate your account'
                    });
                    // Send the draft
                    draft.send().then(message => {
                      console.log(`${message.id} was sent`);
                    });
                  res.send({ message: true });
                } else {
                  res.send({ message: false });
                }
              });
          })
        }
      });
    }
  });
};
/*Login business service. The service will check the user authentication*/
module.exports.login = function (req, res) {

  //Retrieve data from the request and assign value to the variables
  const username = req.body.user.username;
  const password = req.body.user.password;

  //The logic that it will check for the username first if it is existing on the database first
  //Select all fields of a record with username
  db.query("SELECT * FROM users WHERE username = ? AND isActivated = 1", [username], (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    //if found the username, compare password for logging in.
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        //Respond back with an announcement that the user is logged in.
        if (response) {
          //console.log(result);
          const u = new user(result[0].userId, result[0].firstname, result[0].lastname, result[0].username, result[0].role, result[0].lastLogin, result[0].isActivated, result[0].email, result[0].phone);
          //console.log(u);
          req.session.user = u;
          //Update the last time the user logged in.
          db.query("UPDATE users SET lastLogin = ? WHERE userId = ?", [new Date(), result[0].userId], (err, result) => { });
          res.send({
            message: {
              //Provide a messege that user logged in and return a username
              msg: "loggedin",
              username: result[0].username,
              user: u
            }
          })
        }
        //The provided password is not correct. 
        else {
          res.send({
            //Return message that password is not correct and return the username is null
            message: {
              msg: "incorrectPassword",
              username: null
            }
          });
        }
      })
    } else {
      //username is not found on the database.
      res.send({
        message: {
          msg: "notExist",
          username: null
        }
      })
    }
  });
}
/*introduct business service. The service will get the Mahjong introduction*/
module.exports.introduce = function (req, res) {
  //Retrieve data from the request and assign value to the variables
  db.query("SELECT * FROM introduce", (err, result) => {

    if (err) {
      res.send({ err: err })
    }
    if (result.length > 0) {
      res.send({
        data: {
          msg: "introduce data",
          result: result[0]
        }
      })
    }
    else {
      res.send({
        data: {
          msg: "cannot get data",
          result: null
        }
      })
    }
  });
}

/*scoring business service. The service will get the scoring information and example*/
module.exports.scoring = function (req, res) {
  //Retrieve data from the request and assign value to the variables
  db.query("SELECT * FROM scoring", (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    if (result.length > 0) {
      res.send({
        data: {
          msg: "scoring data",
          result: result
        }
      })
    }
    else {
      res.send({
        data: {
          msg: "cannot get data",
          result: null
        }
      })
    }
  });
}
/* Profile business service. The service will get the profile information.
Get username, email, phone, firstname, lastname, score, wonGames, totalGames
*/
module.exports.profile = function (req, res) {
  const userId = req.params.userId;
  //Retrieve data from the request and assign value to the variables
  db.query("SELECT users.userId, username, email, phone, firstname, lastname, score, wonGames, totalGames, image FROM users inner join userinfo on users.userId = userinfo.userId where users.userId = ?",
    [userId], (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result.length > 0) {
        res.send({
          data: {
            msg: "profile data",
            result: result
          }
        })
      }
      else {
        res.send({
          data: {
            msg: "cannot get data",
            result: null
          }
        })
      }
    });
}
/*Update profile*/
module.exports.updateProfile = function (req, res) {
  //Retrieve data from the request and assign value to the variables
  const userId = req.body.user.userId;
  const firstname = req.body.user.firstname;
  const lastname = req.body.user.lastname;
  const email = req.body.user.email;
  const phone = req.body.user.phone;
  //Create sql query to update the user profile
  db.query("UPDATE users SET firstname = ?, lastname = ?, email = ?, phone = ? WHERE userId = ?", [firstname, lastname, email, phone, userId], (err, result) => {
    console.log(result);
  });
  res.send({
    message: {
      msg: true
    }
  })
}
/*Upload profile image to server*/
module.exports.updateAvatar = (req, res) => {
  let upload = imageUploader.single('avatar');
  upload(req, res, function () {
    //Using multer to attach file into req
    const processedFile = req.file || {};
    //Get userId from request
    const userId = req.body.userId;
    //get the original name from uploading machine
    let orgName = processedFile.originalname || '';
    orgName = orgName.trim().replace(/ /g, "-")
    //Get the full file path uploaded to server
    const fullPathInServ = processedFile.path;
    //Edit the name and attach file extension.
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    console.log(userId);
    //Update the profile image for the user
    db.query("UPDATE users SET image = ? WHERE userId = ?", [newFullPath, userId], (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send({
      status: true,
      message: 'file uploaded',
      fileNameInServer: newFullPath
    })
  })
}
/*Get the avatar image*/
module.exports.getAvatar = (req, res) => {
  //Get the file name from the request
  const fileName = req.params.name;
  if (!fileName) {
    return res.send({
      status: false,
      message: 'no filename specified',
    })
  }
  //respone the image url
  res.sendFile(path.resolve(`./images/${fileName}`));
}

/*Activate the user account using userID and activation code*/

module.exports.activateAccount = (req, res) => {
  //Get the userID, activation Code from the request
  const userId = req.body.activate.userId;
  const code = req.body.activate.code;
  db.query("SELECT * FROM users WHERE userId = ? AND activationCode = ?", [userId, code],(err, result) => {
    if (err) {
      res.send({ err: err })
    }
    //initiate new user game data.
    if (result.length > 0) {
      db.query("UPDATE users SET isActivated = 1 WHERE userId = ?", [userId], (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send({
        status: true,
        message: 'Account is activated'
      })
    } else {
      res.send({ 
        status: false,
        message: 'account is not activated, check your userId and activation code'
       })
    }
  });
}
//Inviate a friend to sign up an account
module.exports.inviteFriend = function (req, res) {
  //Get the email of person to be invited
   const inviteEmail = req.body.invitation.email;
   //Get the userId of requester
   const sender = JSON.parse(req.body.invitation.sender).userId;
   //Get the email of the requester
   const senderEmail = JSON.parse(req.body.invitation.sender).email;
   //return message
   const message = '';
   //Check if the request sends friend request to themselve, sending the message back and do nothing
   if(inviteEmail === senderEmail){
      res.send({
        status: false,
        message:'Cannot invite yourself'
      });
    }else{
      //Check if the invitation to a friend had been sent, cannot have two friend requests in the database for the same user
      db.query("SELECT * FROM friendship WHERE userId = ? AND friendEmail = ?",[sender, inviteEmail], (err, result) => {
        if (err) {
            res.send({ err: err })
        }
        //Send back the message if found duplicated invitation
        if(result.length > 0){
            console.log('duplicate email invitation');
            res.send({
              status: false,
              message:'Duplicated invitation'
            });
        }else{ //Insert the friend request data into the friendship table for later uses.
            db.query("INSERT INTO friendship (userId, friendEmail) VALUES (?,?)",
            [sender, inviteEmail], (err, result) => {
              if (err) {
                res.send({ err: err })
              }else{
                //Send the invitation via email
                const nylas = Nylas.with('ko6HJh3damo7ZJC4IBBX8wLpOOFl9V');
                const draft = nylas.drafts.build({
                  subject: 'Mahjong Game. Hi, my name is: ' + JSON.parse(req.body.invitation.sender).firstname,
                  to: [{ name: 'Friend', email:  inviteEmail}],
                  body: 'Hi, sign up an account using your email on Mahjong game website to be friend and enjoy the game together!'
                });
                // Send the draft
                draft.send().then(message => {
                  console.log(`${message.id} was sent`);
                });
                //Send back the message for invitation was sent successfully.
                res.send({ 
                  status: true,
                  message:'Invitation was sent'
                })
                return;
              }
            });  
          }
        });
    }
}
//Get the friend list
module.exports.getFriendList = function (req, res) {
  const userId = req.params.userId;
  db.query("SELECT userId, firstname, lastname, image from users u WHERE EXISTS (SELECT friendID from friendship f WHERE u.userId = f.friendID AND f.userId = ?)",[userId], (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    if (result.length > 0) {
      res.send({
        data: {
          msg: "friend list",
          result: result
        }
      })
    }
    else {
      res.send({
        data: {
          msg: "cannot get data",
          result: null
        }
      })
    }
  });
}