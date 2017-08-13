class MeteorFactory {
  constructor() {
    //update
    this.sprite = Nakama.game.add.sprite();
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);

    Nakama.meteorPool = new MeteorPool();
    this.timerOfMeteor = 0;
    this.meteorCreateTime = Nakama.game.rnd.integerInRange( 3 * 60, 8 * 60);
    //this.createMeteor();
  }

  update() {
    this.timerOfMeteor++;
    if (this.timerOfMeteor == this.meteorCreateTime) {
      Nakama.meteorPool.addMeteor();
      this.meteorCreateTime = Nakama.game.rnd.integerInRange( 3 * 60, 8 * 60);
      this.timerOfMeteor = 0;
      //console.log(this.meteorCreateTime);
    }
  }


    // create shield
  //   this.timerMeteor = Nakama.game.time.events;
  //   this.METEOR_CREATE_TIME = Math.floor((Math.random() * 8) + 4);
  //   this.timerMeteor.repeat(this.METEOR_CREATE_TIME*1000, 1, this.createMeteor, this);
  // }
  //
  // update() {
  //   Nakama.game.physics.arcade.collide(Nakama.meteorGroup);
  // }
  //
  // createMeteor () {
  //   Nakama.meteorPool.addMeteor();
  //   this.METEOR_CREATE_TIME = Math.floor((Math.random() * 8) + 4);
  //   this.timerMeteor.repeat(this.METEOR_CREATE_TIME*1000, 1, this.createMeteor, this);
  // }

  // createMeteor() {
  //   this.meteorInterval = setInterval(function(){  Nakama.meteorPool.addMeteor(); }, 5000);
  // }
}
