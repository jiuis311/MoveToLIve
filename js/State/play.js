var playState = {
  // initialize the game
  create: function(){
    Nakama.game.add.sprite(0, 0, 'background');
    //Nakama.game.add.sprite(300, 300, 'spaceBomb');
    Nakama.blackHole = Nakama.game.add.sprite(300, 700, 'BlackHole');
    Nakama.blackHole.anchor = new Phaser.Point(0.5, 0.5);
    Nakama.blackHole.scale.set(1);

    //physics group
    Nakama.sunGroup = Nakama.game.add.physicsGroup();
    Nakama.shieldTokenGroup = Nakama.game.add.physicsGroup();
    Nakama.sunTokenGroup = Nakama.game.add.physicsGroup();
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
    Nakama.tokens = [];
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
    Nakama.suns = [];

    // create EnemyFactory
    Nakama.enemyFactories.push(new EnemyFactory());


    //tester
    //Nakama.enemies.push(new EnemyType2Controller(100, 100, 0, 100));
    //Nakama.game.add.sprite(500, 200, 'BurningSun');
    //Nakama.suns.push(new SunController(500, 600));

    //sound
    Nakama.explosionSound = [];

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
      Nakama.displayingText.setText("Score: " + Nakama.score);
    }else {
      Nakama.displayingText.destroy();

      if(localStorage.getItem("highscore") === null){
        localStorage.setItem("highscore", Nakama.score);
      }
      else if(localStorage.getItem("highscore") < Nakama.score){
        localStorage.setItem("highscore", Nakama.score);
      }
      Nakama.game.state.start('win');
    }


    //blackHole spin
    Nakama.blackHole.rotation += Nakama.game.math.degToRad(-1);
  },

  // before camera render (mostly for debug)
  render: function(){
    // Nakama.game.debug.body(Nakama.player.sprite);
    // Nakama.enemies.forEach((enemy) => {
    //   Nakama.game.debug.body(enemy.sprite);
    // });
  },
}
