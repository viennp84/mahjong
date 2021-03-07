class Player {
    constructor(hand, playerPosition, score, won, totalGames, isDealer){
        this.hand = hand;
        this.playerPosition = playerPosition;
        this.score = score;
        this.won = won;
        this.totalGames = totalGames;
        this.isDealer = isDealer;
      }
}
module.exports = Player;