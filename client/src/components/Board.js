import Layer from './Player';
export default class Board {
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
