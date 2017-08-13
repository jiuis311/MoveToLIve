var menuState = {
  preload: function(){
    Nakama.game.scale.minWidth = 800;
    Nakama.game.scale.minHeight = 450;
    Nakama.game.scale.maxWidth = 1600;
    Nakama.game.scale.maxHeight = 900;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background','Assets/background2.png');
    Nakama.game.load.image('player','Assets/spaceship2.png');
    Nakama.game.load.image('button', 'Assets/playbutton.png');
    Nakama.game.load.image('gameName', 'Assets/namegame1.png');
  },
  create: function(){
    Nakama.game.add.sprite(0, 0, 'background');
    Nakama.gameName = Nakama.game.add.sprite(Nakama.game.width/2, Nakama.game.height/2 - 120, 'gameName');
    Nakama.gameName.anchor = new Phaser.Point(0.5, 0.5);

    var checkPlay = false;
    var button = Nakama.game.add.button(Nakama.game.world.centerX - 150, Nakama.game.world.centerY + 130, 'button', function(){
      checkPlay = true;
      button.pendingDestroy = true;
      this.start();
    }, this);
  },
  start: function(){
    console.log("Menu to Play");
    Nakama.game.state.start('play');
  }
};
