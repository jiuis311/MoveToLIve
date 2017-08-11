class ShieldToken {
  constructor() {
    this.x = Math.floor((Math.random() * Nakama.game.scale.maxWidth - 150) + 150);
    this.y = Math.floor((Math.random() * Nakama.game.scale.maxHeight - 150) + 150);
    this.sprite = Nakama.tokenGroup.create(this.x, this.y, 'shieldToken');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    // set scale
    this.sprite.scaleSize = 0.1;
    this.sprite.scale.set(this.sprite.scaleSize);
    this.sprite.ROTATE_SPEED = 1;

    //kill shield
    this.timerShieldTokenKill = Nakama.game.time.events;
    this.timerShieldTokenKill.repeat(15000, 1, this.killShieldToken, this);
  }

  update() {
    Nakama.game.physics.arcade.overlap(
      Nakama.playerGroup,
      Nakama.tokenGroup,
      this.onPlayerHitToken
    );
    if (this.sprite.scaleSize <= 1) {
      this.sprite.scaleSize += 0.1;
      this.sprite.scale.set(this.sprite.scaleSize);
    }

    this.sprite.rotation += Nakama.game.math.degToRad(this.sprite.ROTATE_SPEED);
  }

  onPlayerHitToken (playerSprite, tokenSprite) {
   tokenSprite.kill();
   Nakama.shield = new Shield();
 }

 killShieldToken () {
   this.sprite.kill();
 }
}
