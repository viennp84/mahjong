//Import player class 
import Layer from './Player'; 
/*
Vien Nguyen
CST-452 Senior Project II
Feb 5th/2021
The Board class is used to manage the game data
*/
export default class Board {
  //Declare the class properties
    constructor(){
        this.tiles = []
        this.eastPlayer = new Layer()
        this.southPlayer = new Layer()
        this.westPlayer = new Layer()
        this.nortPlayer = new Layer()
        this.turn = ''
        this.windOfGame = ''
        this.diceRolledValue = ''
        this.flowerWallNumber = ''
    }
}
