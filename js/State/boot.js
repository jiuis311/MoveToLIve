var bootState = {
  create: function(){
    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    var stateTrailer1 = Nakama.game.add.text(100, 100, 'LOADING...',{
      font: "50x Chiller",
      fill: "#ffffff"
    });
  //   var spacebarKey = Nakama.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  //   spacebarKey.onDown.addOnce(this.start, this);
  // },
  // start: function(){
  //   console.log("Boot to Load");
    Nakama.game.state.start('load');
  // }
  }
};
