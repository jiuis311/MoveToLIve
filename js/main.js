var Nakama = {};
Nakama.configs = {};

window.onload = function(){
  Nakama.game = new Phaser.Game(1600,900,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
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
  Nakama.game.load.image('shieldToken','Assets/ShieldToken.png');
  Nakama.game.load.image('player','Assets/spaceship.png');
  Nakama.game.load.image('enemy','Assets/EnemyType2.png');
  Nakama.game.load.image('explodePlayer','Assets/explosion1.png');
}

// initialize the game
var create = function(){
  Nakama.game.add.sprite(0, 0, 'background');

  //physics group
  Nakama.tokenGroup = Nakama.game.add.physicsGroup();
  Nakama.shieldGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  //create stuff
  Nakama.shieldToken = new ShieldToken();
  Nakama.player = new PlayerController();
  Nakama.shield = {};
  Nakama.enemies = [];
  Nakama.explodePlayer = {};

  createEnemy();

  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
}

// update game state each frame
var update = function(){
  // Nakama.game.physics.arcade.overlap(
  //   Nakama.enemyGroup,
  //   Nakama.playerGroup,
  //   onBulletHitEnemy
  // );
}

// before camera render (mostly for debug)
var render = function(){}

// var onBulletHitEnemy = function(enemySprite, playerSprite) {
//   playerSprite.kill();
//
//   //reset Bullet Type 3
// }

var createEnemy = function() {
    for(var i = 0; i < 1000; i++) {
      setTimeout(function(){ Nakama.enemies.push(new EnemyController()); }, i*1000);
  }
}
