//Import database package from db.js
var db = require('../db');
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports.getAllUsers = function (req, res) {
    //Checking if the username is exist on database
  db.query("SELECT userId, username, role, lastLogin, isActivated, email, phone, firstname, lastname, image FROM users", (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    if (result.length > 0) {
        res.send({
          data: {
            msg: "user data",
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
};
module.exports.getActivatedUsers = function (req, res) {
    //Checking if the username is exist on database
  db.query("SELECT userId, username, role, lastLogin, isActivated, email, phone, firstname, lastname, image FROM users WHERE isActivated = 1", (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    if (result.length > 0) {
        res.send({
          data: {
            msg: "user data",
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
};
module.exports.viewUser = function (req, res) {
    //Checking if the username is exist on database
  db.query("SELECT users.userId, username, email, phone, firstname, lastname, score, wonGames, totalGames, image FROM users inner join userinfo on users.userId = userinfo.userId where users.userId = ?",[userId], (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    if (result.length > 0) {
        res.send({
          data: {
            msg: "user data",
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
};
module.exports.searchForUser = function (req, res) {
  const keyWord = req.params.keyWord;
    //Checking if the username is exist on database
  db.query("SELECT users.userId, username, email, phone, firstname, lastname, score, wonGames, totalGames, image FROM users inner join userinfo on users.userId = userinfo.userId where users.userId LIKE ? OR users.email LIKE ? OR users.phone LIKE ?",[keyWord,keyWord, keyWord], (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    if (result) {
        res.send({
          data: {
            msg: "user data",
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
};
module.exports.updatePassword = function (req, res) {
  const userId = req.body.passwordForm.userId;
  const currentPassword = req.body.passwordForm.currentPassword;
  const newPassword = req.body.passwordForm.newPassword;
  console.log(userId);
  console.log(currentPassword);
  console.log(newPassword);
    db.query("SELECT * FROM users WHERE userId = ? ", [userId], (err, result) => {
      if (err) {
        res.send({ err: err })
      }
      if (result.length > 0) {
        bcrypt.compare(currentPassword, result[0].password, (err)=> {
          bcrypt.hash(newPassword, saltRounds, (err, hash) => {
            if (err) {
              console.log(err);
            }
            db.query("UPDATE users SET password = ? WHERE userId = ?", [hash, userId], (err, result) => { 
              console.log(result.affectedRows);
              if(result.affectedRows > 0){
                res.send({
                  message: {
                    //Provide a messege that user changed the password
                    result: true
                  }
                })
              }else{
                res.send({
                  message: {
                    //Provide a messege that user changed the password
                    result: false
                  }
                })
              }
            });
          });
        });
      }
  });
}

module.exports.deactivateAccount = function(req, res) {
  const userId = req.params.userId;
  db.query("UPDATE users SET isDeleted = ? WHERE userId = ?", [true, userId], (err, result) => { 
    if (err) {
      res.send({ err: err })
    } 
    console.log(result);
    if(result.affectedRows > 0){
      res.send({
        message: {
          //Provide a messege that user changed the password
          result: true
        }
      })
    }else{
      res.send({
        message: {
          //Provide a messege that user changed the password
          result: false
        }
      })
    }
});
}

module.exports.getUnActivateddUsers = function (req, res) {
  //Checking if the username is exist on database
db.query("SELECT userId, username, role, lastLogin, isActivated, email, phone, firstname, lastname, image FROM users WHERE isActivated = 0", (err, result) => {
  if (err) {
    res.send({ err: err })
  }
  if (result.length > 0) {
      res.send({
        data: {
          msg: "user data",
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
};