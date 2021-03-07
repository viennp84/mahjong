var Player = require('./Player');

class Board {
    constructor(tiles, eastPlayer, southPlayer, westPlayer, northPlayer, turn, windOfGame, diceRolledValue, flowerWallNumber){
        this.tiles = tiles;
        this.eastPlayer = eastPlayer;
        this.southPlayer = southPlayer;
        this.westPlayer = westPlayer;
        this.northPlayer = northPlayer;
        this.turn = turn;
        this.windOfGame = windOfGame;
        this.diceRolledValue = diceRolledValue;
        this.flowerWallNumber = flowerWallNumber;

      }
}
module.exports = Board;
