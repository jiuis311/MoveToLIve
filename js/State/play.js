var playState = {
  // initialize the game
  create: function(){
    Nakama.game.add.sprite(0, 0, 'background');
    //Nakama.game.add.sprite(300, 300, 'spaceBomb');

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
    Nakama.meteorFactory = new MeteorFactory();

    // create player
    Nakama.player = new PlayerController();
    Nakama.shield = {};
    Nakama.enemies = [];
    Nakama.enemyFactories = [];
    Nakama.explosions = [];
    Nakama.meteors = [];

    //timing
    Nakama.gameTime = 0;

    //EnemyType2 tester
    //Nakama.enemies.push(new EnemyType2Controller(100, 100, 0, 100));

    //sound
    Nakama.explosionSound = [];


    this.createEnemy();

    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    Nakama.keyboard = Nakama.game.input.keyboard;
  },

  // update game state each frame
  update: function(){
    //scorring
    //console.log(Nakama.gameTime);
    if(!Nakama.playerDie){
      Nakama.frame++;
      Nakama.score += (Nakama.frame % 60 === 0);
      Nakama.gameTime += (Nakama.frame % 60 === 0);
      Nakama.displayingText.setText("Score: " + Nakama.score);
    }else {
      Nakama.displayingText.destroy();

      if(localStorage.getItem("highscore") === null){
        localStorage.setItem("highscore", Nakama.score);
      }
      else if(localStorage.getItem("highscore") < Nakama.score){
        localStorage.setItem("highscore", Nakama.score);
      }

      //Create Type 1 enemy (TODO - put in Factory)
      clearInterval(this.enemyInterval);
      Nakama.game.state.start('win');
    }

    //enemy rain
    if (Nakama.gameTime == 30) {
      Nakama.enemyFactories.push(new EnemyFactory1());
      Nakama.gameTime++;
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
