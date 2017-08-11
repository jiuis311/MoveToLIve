class ShieldToken {
  constructor() {
    // this.x = Math.floor((Math.random() * Nakama.game.scale.maxWidth - 150) + 150);
    // this.y = Math.floor((Math.random() * Nakama.game.scale.maxHeight - 150) + 150);
    this.x = Nakama.game.rnd.integerInRange(200, Nakama.game.scale.maxWidth - 200)
    this.y = Nakama.game.rnd.integerInRange(200, Nakama.game.scale.maxHeight - 200)
    this.sprite = Nakama.shieldTokenGroup.create(this.x, this.y, 'shieldToken');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    // set scale
    this.sprite.scaleSize = 0.1;
    this.sprite.scale.set(this.sprite.scaleSize);
    this.sprite.ROTATE_SPEED = 1;

    //kill shield
    this.timerShieldTokenKill = Nakama.game.time.events;
    this.timerShieldTokenKill.repeat(30000, 1, this.killShieldToken, this);
  }

  update() {
    Nakama.game.physics.arcade.overlap(
      Nakama.playerGroup,
      Nakama.shieldTokenGroup,
      this.onPlayerHitToken
    );
    if (this.sprite.scaleSize <= 1) {
      this.sprite.scaleSize += 0.1;
      this.sprite.scale.set(this.sprite.scaleSize);
    }

    this.sprite.rotation += Nakama.game.math.degToRad(this.sprite.ROTATE_SPEED);
  }

  onPlayerHitToken (playerSprite, shieldTokenSprite) {
   shieldTokenSprite.kill();
   Nakama.shield = new Shield();
 }

 killShieldToken () {
   this.sprite.kill();
 }
}
