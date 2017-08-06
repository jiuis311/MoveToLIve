class Shield {
  constructor() {
    this.sprite = Nakama.shieldGroup.create(Nakama.player.sprite.position.x, Nakama.player.sprite.position.y, 'shield');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    setTimeout(function() {Nakama.shield.sprite.kill();}, 10000);
  }

  update() {
    this.sprite.position.x = Nakama.player.sprite.position.x;
    this.sprite.position.y = Nakama.player.sprite.position.y;
    Nakama.game.physics.arcade.overlap(
      Nakama.enemyGroup,
      Nakama.shieldGroup,
      this.onShieldHitEnemy
    );
  }

   onShieldHitEnemy (enemySprite, shieldSprite) {
    enemySprite.kill();
  }
}
