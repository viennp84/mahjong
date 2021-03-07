var db = require('../db');

var Tile = require('../models/Tiles');
var Player = require('../models/Player');
var Board = require('../models/Board');

module.exports.getGameRoom = function (req, res) {
    db.query("SELECT * FROM gameRoom WHERE ID = 1", (err, result) => {
        if (err) {
          res.send({ err: err })
        }
        if (result.length > 0) {
            res.send({
              data: {
                msg: "game data",
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
module.exports.createNewGame = function (req, res) {

var t = new Tile('1','vien','dd','dd');
var player = new Player();
var board = new Board();
console.log(t);
console.log(player);
console.log(board);
db.query("SELECT * FROM gameRoom WHERE ID = 1", (err, result) => {
    if (err) {
      res.send({ err: err })
    }else{
      console.log(result);
    }
});
db.query("SELECT * FROM Tile", (err, result) => {
  if (err) {
    res.send({ err: err })
  }else{
    console.log(result);
  }
});
res.send();
// db.query("SELECT * FROM gameRoom WHERE ID = 1", (err, result) => {
//   if (err) {
//     res.send({ err: err })
//   }
//   if (result.length > 0) {
//       res.send({
       
//     })
//   }
//   else {
//     res.send({
//       data: {
//         msg: "cannot get data",
//         result: null
//         }
//       })
//     }
//   });
};

module.exports.getAllMahjongTiles= function (req, res) {

  var tiles = [];
  db.query("SELECT * FROM Tile", (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    if(result.length > 0){
      //console.log(result.length);

      for(var i = 0; i < result.length; i ++){

        var tile = new Tile(
          result[i].ID,
          result[i].TileIdentity,
          result[i].MatchingCode,
          result[i].Name,
          result[i].Value,
          result[i].Image, 
          0,0,0,0
        );
        tiles.push(tile);
      }
      console.log(tiles);

      res.send({
        data: {
          status: true,
          result: tiles
        }
      });
    }
    else{
      res.send({
        data: {
          status: false,
          result: ''
        }
      });
    }
  });    
};