var playState = {
  // preload: function(){
  //
  //   Nakama.game.scale.minWidth = 800;
  //   Nakama.game.scale.minHeight = 450;
  //   Nakama.game.scale.maxWidth = 1600;
  //   Nakama.game.scale.maxHeight = 900;
  //   Nakama.game.scale.pageAlignHorizontally = true;
  //   Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  //
  //   Nakama.game.time.advancedTiming = true;
  //
  //   Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  //   Nakama.game.load.image('background','Assets/background2.png');
  //   Nakama.game.load.image('shield','Assets/shield.png');
  //   Nakama.game.load.image('shieldToken','Assets/flat-shield-icon-17.png');
  //   Nakama.game.load.image('player','Assets/spaceship.png');
  //   Nakama.game.load.image('enemy','Assets/EnemyType2.png');
  //   Nakama.game.load.image('explodePlayer','Assets/explosion1.png');
  //
  //   //exlode animation preload
  //   Nakama.game.load.spritesheet('kaboom', 'Assets/Explode.png', 128, 128);
  //
  //   //load sound
  //   Nakama.game.load.audio('playerExplodeSound','Assets/Explosion+7.mp3');
  //   Nakama.game.load.audio('enemyExplodeSound','Assets/Explosion.mp3');
  // },

  // initialize the game
  create: function(){
    Nakama.game.add.sprite(0, 0, 'background');

    //physics group
    Nakama.tokenGroup = Nakama.game.add.physicsGroup();
    Nakama.shieldGroup = Nakama.game.add.physicsGroup();
    Nakama.enemyGroup = Nakama.game.add.physicsGroup();
    Nakama.playerGroup = Nakama.game.add.physicsGroup();
    Nakama.meteorGroup = Nakama.game.add.physicsGroup();

    //Scorring
    Nakama.style = { font: "30px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };
    Nakama.score = 0;
    Nakama.frame = 0;
    Nakama.displayingText = Nakama.game.add.text( 10, 10, "Score: " + Nakama.score, Nakama.style);
    Nakama.playerDie = false;

    //create token
    Nakama.shieldTokens = [];
    Nakama.tokenController = new TokenController();

    //create Meteor
    Nakama.meteorController = new MeteorController();

    // create player
    Nakama.player = new PlayerController();
    Nakama.shield = {};
    Nakama.enemies = [];
    Nakama.explosions = [];
    Nakama.meteors = [];


    //sound
    Nakama.explosionSound = [];


    this.createEnemy();

    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    Nakama.keyboard = Nakama.game.input.keyboard;

    // Nakama.fps = Nakama.game.add.text(100, 100, 'FPS: 0',{
    //   font: "30px Arial",
    //   fill: "#ffffff"
    // });
  },

  // update game state each frame
  update: function(){
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
      // Nakama.style = { font: "bold 50px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };
      // var text = Nakama.game.add.text(Nakama.game.world.centerX, Nakama.game.world.centerY,
      //     "     Score: " + Nakama.score + "\nHighscore: " + localStorage.getItem("highscore") , Nakama.style);
      // text.anchor.setTo(0.5, 0.5);
      //given winState
      clearInterval(this.enemyInterval);
      Nakama.game.state.start('win');
    }
  },

  // before camera render (mostly for debug)
  render: function(){
    // Nakama.game.debug.body(Nakama.player.sprite);
    // Nakama.enemies.forEach((enemy) => {
    //   Nakama.game.debug.body(enemy.sprite);
    // });
  },


  createEnemy: function() {
    this.enemyInterval = setInterval(function(){ Nakama.enemies.push(new EnemyController()); }, 1000);
  }
}
