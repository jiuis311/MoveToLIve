class Shield {
  constructor() {
    this.sprite = Nakama.shieldGroup.create(Nakama.player.sprite.position.x, Nakama.player.sprite.position.y, 'shield');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    //kill shield
    this.timerShieldKill = Nakama.game.time.events;
    this.timerShieldKill.repeat(7000, 1, this.killShield, this);
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
    Nakama.explosions.push(new Explode(enemySprite.position.x, enemySprite.position.y));
    enemySprite.kill();
    Nakama.explosionSound.push(new ExplodeSound('enemyExplodeSound', 0.2));

    //score ---- bonus kill enemy
    Nakama.score += Nakama.configs.BONUS_KILL_ENEMY;
  }

  killShield () {
    this.sprite.kill();
  }
}
