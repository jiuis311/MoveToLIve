var winState = {
  preload: function(){
    Nakama.game.scale.minWidth = 800;
    Nakama.game.scale.minHeight = 450;
    Nakama.game.scale.maxWidth = 1600;
    Nakama.game.scale.maxHeight = 900;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background','Assets/background2.png');
    Nakama.game.load.image('homeButton', 'Assets/homeButton.png');
    Nakama.game.load.image('replayButton', 'Assets/replayButton.png');
  },
  create: function(){
    Nakama.game.add.sprite(0, 0, 'background');

    var checkReplay = false;
    var checkReHome = false;
    var replayButton = Nakama.game.add.button(100, 100, 'replayButton', function(){
      checkReplay = true;
      replayButton.pendingDestroy = true;
      this.replay();
    }, this);
    var homeButton = Nakama.game.add.button(Nakama.configs.GAME_WIDTH - 250, 100, 'homeButton', function(){
      checkReHome = true;
      homeButton.pendingDestroy = true;
      this.rehome();
    }, this);

    Nakama.style = { font: "bold 50px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };
    var score = Nakama.game.add.text(Nakama.game.world.centerX, Nakama.game.world.centerY,
    "     Score: " + Nakama.score + "\nHighscore: " + localStorage.getItem("highscore") , Nakama.style);
    score.anchor.setTo(0.5, 0.5);
  },
  rehome: function(){
    Nakama.game.state.start('menu');
  },
  replay: function(){
    Nakama.game.state.start('play');
  }
}
