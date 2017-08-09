var winState = {
  create: function(){
    var background = Nakama.game.stage.backgroundColor = '#456823';
    background.anchor = new Phaser.Point(0.5, 0.5);
    background.width = Nakama.configs.GAME_WIDTH;
    background.height = Nakama.configs.GAME_HEIGHT;

    Nakama.style = { font: "bold 50px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };
    var score = Nakama.game.add.text(Nakama.game.world.centerX, Nakama.game.world.centerY,
    "     Score: " + Nakama.score + "\nHighscore: " + localStorage.getItem("highscore") , Nakama.style);
    score.anchor.setTo(0.5, 0.5);
  }
}
