class TokenController {
  constructor() {
    // create shield
    this.timerShield = Nakama.game.time.events;
    this.SHIELDTOKEN_CREATE_TIME = Math.floor((Math.random() * 40) + 30);
    Nakama.shieldTokens.push(new ShieldToken());
    this.timerShield.repeat(this.SHIELDTOKEN_CREATE_TIME*1000, 1, this.createShieldToken, this);
  }

  createShieldToken () {
    Nakama.shieldTokens.push(new ShieldToken());
    this.SHIELD_CREATE_TIME = Math.floor((Math.random() * 40) + 30);
    this.timerShield.repeat(this.SHIELDTOKEN_CREATE_TIME*1000, 1, this.createShieldToken, this);
  }
}
