var loadState = {
  // preparations before game starts
  preload: function(){

    Nakama.game.scale.minWidth = 800;
    Nakama.game.scale.minHeight = 450;
    Nakama.game.scale.maxWidth = 1600;
    Nakama.game.scale.maxHeight = 900;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.time.advancedTiming = true;

    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background','Assets/background2.png');
    Nakama.game.load.image('shield','Assets/shield.png');
    Nakama.game.load.image('shieldToken','Assets/flat-shield-icon-17.png');
    Nakama.game.load.image('player','Assets/spaceship.png');
    Nakama.game.load.image('enemy','Assets/EnemyType2.png');
    Nakama.game.load.image('explodePlayer','Assets/explosion1.png');
    Nakama.game.load.image('meteor','Assets/meteorite.png');

    //exlode animation preload
    Nakama.game.load.spritesheet('kaboom', 'Assets/Explode.png', 128, 128);

    //load sound
    Nakama.game.load.audio('playerExplodeSound','Assets/Explosion+7.mp3');
    Nakama.game.load.audio('enemyExplodeSound','Assets/Explosion.mp3');
  },

  create: function(){
    var stateTrailer1 = Nakama.game.add.text(100, 100, 'Do more trailer 2',{
      font: "30px Chiller",
      fill: "#ffffff"
    });
  //   var spacebarKey = Nakama.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  //   spacebarKey.onDown.addOnce(this.start, this);
  // },
  // start: function(){
  //   console.log("Load to Menu");
    Nakama.game.state.start('menu');
  }
};
