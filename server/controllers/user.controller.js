//Import Encryption package
const bcrypt = require("bcrypt");
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
  clientId: '4zp9e9e81xbehojanc35bq3ye',
  clientSecret: '230ea1pz1xjzyektxfsmallvg',
});

module.exports.inviteFriend = function (req, res) {
  const nylas = Nylas.with('yBreaX0TbNkzx5ed6MN8igvljQZDfi');
  const draft = nylas.drafts.build({
    subject: 'With Love, from Nylas',
    to: [{ name: 'My Nylas Friend', email: 'jim.nguyen083@gmail.com' }],
    body: 'This email was sent using the Nylas email API. Visit https://nylas.com for details.'
  });
  // Send the draft
  draft.send().then(message => {
    console.log(`${message.id} was sent`);
  });

}


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
            db.query("INSERT INTO users (email, phone, username, password, role, isActivated, firstname, lastname) VALUES (?,?,?,?,?,?,?,?)",
              [email, phone, username, hash, role, isActivated, firstname, lastname], (err, result) => {
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
                  console.log("Employee Id:- " + result.insertId);
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
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
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
    //console.log(result);
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