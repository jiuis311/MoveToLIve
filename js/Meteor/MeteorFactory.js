class MeteorFactory {
  constructor() {
    //update
    this.sprite = Nakama.game.add.sprite();
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);

    // create shield
    this.timerMeteor = Nakama.game.time.events;
    this.METEOR_CREATE_TIME = Math.floor((Math.random() * 8) + 4);
    this.timerMeteor.repeat(this.METEOR_CREATE_TIME*1000, 1, this.createMeteor, this);
  }

  update() {
    Nakama.game.physics.arcade.collide(Nakama.meteorGroup);
  }

  createMeteor () {
    Nakama.meteors.push(new MeteorController());
    this.METEOR_CREATE_TIME = Math.floor((Math.random() * 8) + 4);
    this.timerMeteor.repeat(this.METEOR_CREATE_TIME*1000, 1, this.createMeteor, this);
  }
}
