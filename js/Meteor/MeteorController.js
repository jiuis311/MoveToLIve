class MeteorController {
  constructor() {
    // create shield
    this.timerMeteor = Nakama.game.time.events;
    this.METEOR_CREATE_TIME = Math.floor((Math.random() * 8) + 4);
    this.timerMeteor.repeat(this.METEOR_CREATE_TIME*1000, 1, this.createMeteor, this);
  }

  createMeteor () {
    Nakama.meteors.push(new Meteor());
    this.METEOR_CREATE_TIME = Math.floor((Math.random() * 8) + 4);
    this.timerMeteor.repeat(this.METEOR_CREATE_TIME*1000, 1, this.createMeteor, this);
  }
}
