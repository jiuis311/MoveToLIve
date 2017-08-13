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
    Nakama.game.load.image('broken1', 'Assets/broke1.png');
    Nakama.game.load.image('broken2', 'Assets/broke2.png');
    Nakama.game.load.image('broken3', 'Assets/broke3.png');
    Nakama.game.load.image('broken4', 'Assets/broke4.png');
  },
  create: function(){
    Nakama.game.add.sprite(0, 0, 'background');

    Nakama.shipBroke1 = Nakama.game.add.sprite(300, 100, 'broken1');
    Nakama.shipBroke1.scale.set(0.5);
    Nakama.game.physics.arcade.enable(Nakama.shipBroke1);
    Nakama.shipBroke1.body.velocity.x = 20;
    Nakama.shipBroke1.body.velocity.y = 40;
    Nakama.shipBroke1.anchor = new Phaser.Point(0.5, 0.5);
    // Nakama.shipBroke1.rotation += Nakama.game.math.degToRad(10);

    Nakama.shipBroke2 = Nakama.game.add.sprite(300, 50, 'broken2');
    Nakama.shipBroke2.scale.set(0.5);
    Nakama.game.physics.arcade.enable(Nakama.shipBroke2);
    Nakama.shipBroke2.body.velocity.x = -10;
    Nakama.shipBroke2.body.velocity.y = 20;
    Nakama.shipBroke2.anchor = new Phaser.Point(0.5, 0.5);
    // Nakama.shipBroke2.rotation += Nakama.game.math.degToRad(-10);


    Nakama.shipBroke3 = Nakama.game.add.sprite(350, 100, 'broken3');
    Nakama.shipBroke3.scale.set(0.5);
    Nakama.game.physics.arcade.enable(Nakama.shipBroke3);
    Nakama.shipBroke3.body.velocity.x = 50;
    Nakama.shipBroke3.body.velocity.y = 0;
    Nakama.shipBroke3.anchor = new Phaser.Point(0.5, 0.5);
    // Nakama.shipBroke3.rotation += Nakama.game.math.degToRad(5);


    Nakama.shipBroke4 = Nakama.game.add.sprite(350, 50, 'broken4');
    Nakama.shipBroke4.scale.set(0.5);
    Nakama.game.physics.arcade.enable(Nakama.shipBroke4);
    Nakama.shipBroke4.body.velocity.x = 10;
    Nakama.shipBroke4.body.velocity.y = 10;
    Nakama.shipBroke4.anchor = new Phaser.Point(0.5, 0.5);
    // Nakama.shipBroke4.rotation += Nakama.game.math.degToRad(-7);

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

    //broken SHIP

    Nakama.style = { font: "bold 50px Arial", fill: "white", boundsAlignH: "center", boundsAlignV: "middle" };
    var score = Nakama.game.add.text(Nakama.game.world.centerX, Nakama.game.world.centerY,
    "     Score: " + Nakama.score + "\nHighscore: " + localStorage.getItem("highscore") , Nakama.style);
    score.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    Nakama.shipBroke1.rotation += Nakama.game.math.degToRad(1);
    Nakama.shipBroke2.rotation += Nakama.game.math.degToRad(-1);
    Nakama.shipBroke3.rotation += Nakama.game.math.degToRad(2);
    Nakama.shipBroke4.rotation += Nakama.game.math.degToRad(-0.5);
  },
  rehome: function(){
    Nakama.game.state.start('menu');
  },
  replay: function(){
    Nakama.game.state.start('play');
  }
}
