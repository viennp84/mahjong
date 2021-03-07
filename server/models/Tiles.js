/*
Vien Nguyen
CST-452 Senior Project II
January 7th/2020
Tile class. This class is manipulated for the game.
*/
class Tile{
    constructor(id, tileIdentity, matchingCode, tileName, tileValue, tileImage, top, left, width, height){
        this.id = id;
        this.tileIdentity = tileIdentity;
        this.matchingCode = matchingCode;
        this.tileName = tileName;
        this.tileValue = tileValue;
        this.tileImage = tileImage;
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
    }
}
module.exports = Tile;