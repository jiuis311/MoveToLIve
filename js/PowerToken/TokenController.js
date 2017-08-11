class TokenController {
  constructor() {
    // create shield
    this.timerToken = Nakama.game.time.events;
    this.SHIELDTOKEN_CREATE_TIME = Nakama.game.rnd.integerInRange(40, 50)
    // Nakama.tokens.push(new ShieldToken());
    this.timerToken.repeat(this.SHIELDTOKEN_CREATE_TIME*1000, 1, this.createShieldToken, this);

    this.SUNTOKEN_CREATE_TIME = Nakama.game.rnd.integerInRange(10, 30)
    Nakama.tokens.push(new SunToken());
    this.timerToken.repeat(this.SUNTOKEN_CREATE_TIME*1000, 1, this.createSunToken, this);

    // create bullet
    this.timerBullet = Nakama.game.time.events;
    this.BULLETTOKEN_CREATE_TIME = Math.floor((Math.random() * 40) + 25);
    Nakama.tokens.push(new BulletToken());
    this.timerBullet.repeat(this.BULLETTOKEN_CREATE_TIME*1000, 1, this.createBulletToken, this);
  }

  createShieldToken () {
    Nakama.tokens.push(new ShieldToken());
    this.SHIELDTOKEN_CREATE_TIME = Nakama.game.rnd.integerInRange(40, 50)
    this.timerToken.repeat(this.SHIELDTOKEN_CREATE_TIME*1000, 1, this.createShieldToken, this);
  }

  createSunToken () {
    Nakama.tokens.push(new SunToken());
    this.SUNTOKEN_CREATE_TIME = Nakama.game.rnd.integerInRange(10, 30)
    this.timerToken.repeat(this.SUNTOKEN_CREATE_TIME*1000, 1, this.createSunToken, this);
  }

  createBulletToken () {
    Nakama.tokens.push(new BulletToken());
    this.BULLET_CREATE_TIME = Math.floor((Math.random() * 40) + 25);
    this.timerBullet.repeat(this.BULLETTOKEN_CREATE_TIME*1000, 1, this.createBulletToken, this);
  }
}
