var Nakama = {};
Nakama.configs = {};

window.onload = function(){
  Nakama.game = new Phaser.Game(1280,720,Phaser.AUTO,'',
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
  Nakama.game.scale.minWidth = 640;
  Nakama.game.scale.minHeight = 360;
  Nakama.game.scale.maxWidth = 1280;
  Nakama.game.scale.maxHeight = 720;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background','Assets/Layer0_1.png');
  Nakama.game.load.image('shield','Assets/shield.png');
  Nakama.game.load.image('shieldToken','Assets/ShieldToken.png');
  Nakama.game.load.image('player','Assets/player.png');
}

// initialize the game
var create = function(){
  Nakama.game.add.sprite(0, 0, 'background');

  Nakama.tokenGroup = Nakama.game.add.physicsGroup();
  Nakama.shieldGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.shieldToken = new ShieldToken();
  Nakama.player = new PlayerController();
  Nakama.shield = {};
  Nakama.enemies = [];

  for(var i = 0; i < 1000; i++)
    setTimeout(function(){ Nakama.enemies.push(new EnemyController()); }, i*1000);


  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
}

// update game state each frame
var update = function(){
  Nakama.game.physics.arcade.overlap(
    Nakama.enemyGroup,
    Nakama.playerGroup,
    onBulletHitEnemy
  );
}

// before camera render (mostly for debug)
var render = function(){}

var onBulletHitEnemy = function(enemySprite, playerSprite) {
  playerSprite.kill();

  //reset Bullet Type 3
}
