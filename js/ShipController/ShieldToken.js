class ShieldToken {
  constructor() {
    this.sprite = Nakama.tokenGroup.create(800, 100, 'shieldToken');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
  }

  update() {
    Nakama.game.physics.arcade.overlap(
      Nakama.playerGroup,
      Nakama.tokenGroup,
      this.onPlayerHitToken
    );
  }

  onPlayerHitToken (playerSprite, tokenSprite) {
   tokenSprite.kill();
   Nakama.shield = new Shield();
 }
}
