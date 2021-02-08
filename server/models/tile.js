/*
Vien Nguyen
CST-452 Senior Project II
January 7th/2020
Tile class. This class is manipulated for the game.
*/
class Tile{
    constructor(id, tileValue, tileName, image){
        this.id = id;
        this.tileValue = tileValue;
        this.tileName = tileName;
        this.image = image;
    }
}
module.exports = Tile;