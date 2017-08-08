var Nakama = {};
Nakama.configs = {
  //scoring
  BONUS_KILL_ENEMY : 10
};

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
  Nakama.game.load.image('shieldToken','Assets/flat-shield-icon-17.png');
  Nakama.game.load.image('player','Assets/spaceship.png');
  Nakama.game.load.image('enemy','Assets/EnemyType2.png');
  Nakama.game.load.image('explodePlayer','Assets/explosion1.png');

  //exlode animation preload
  Nakama.game.load.spritesheet('kaboom', 'Assets/Explode.png', 128, 128);

  //load sound
  Nakama.game.load.audio('playerExplodeSound','Assets/Explosion+7.mp3');
  Nakama.game.load.audio('enemyExplodeSound','Assets/Explosion.mp3');
}

// initialize the game
var create = function(){
  Nakama.game.add.sprite(0, 0, 'background');

  //physics group
  Nakama.tokenGroup = Nakama.game.add.physicsGroup();
  Nakama.shieldGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  //Scorring
  Nakama.style = { font: "30px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };
  Nakama.score = 0;
  Nakama.frame = 0;
  Nakama.displayingText = Nakama.game.add.text( 10, 10, "Score: " + Nakama.score, Nakama.style);
  Nakama.playerDie = false;

  //create token
  Nakama.shieldTokens = [];
  Nakama.tokenController = new TokenController();

  // create player
  Nakama.player = new PlayerController();
  Nakama.shield = {};
  Nakama.enemies = [];
  Nakama.explosions = [];

  //sound
  Nakama.explosionSound = [];


  createEnemy();

  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
}

// update game state each frame
var update = function(){

  //scorring
  if(!Nakama.playerDie){
    Nakama.frame++;
    Nakama.score += (Nakama.frame % 60 === 0)
    Nakama.displayingText.setText("Score: " + Nakama.score);
  }else{
    Nakama.displayingText.destroy();

    if(localStorage.getItem("highscore") === null){
      localStorage.setItem("highscore", Nakama.score);
    }
    else if(localStorage.getItem("highscore") < Nakama.score){
      localStorage.setItem("highscore", Nakama.score);
    }
    Nakama.style = { font: "bold 50px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };
    var text = Nakama.game.add.text(Nakama.game.world.centerX, Nakama.game.world.centerY,
        "     Score: " + Nakama.score + "\nHighscore: " + localStorage.getItem("highscore") , Nakama.style);
    text.anchor.setTo(0.5, 0.5);
  }

}

// before camera render (mostly for debug)
var render = function(){}


var createEnemy = function() {
    for(var i = 0; i < 1000; i++) {
      setTimeout(function(){ Nakama.enemies.push(new EnemyController()); }, i*1000);
  }
}
