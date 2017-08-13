class Bullet {
  constructor() {
    this.sprite = Nakama.bulletGroup.create(0, 0, 'bullet');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.outOfBoundsKill = true;


    //kill Bullet
    // this.timerBulletKill = Nakama.game.time.events;
    // this.timerBulletKill.repeat(10000, 1, this.killBullet, this);
    // this.configs.TARGETANGLE = Nakama.game.math.angleBetween(
    //   Nakama.player.sprite.position.x,
    //   Nakama.player.sprite.position.y,
    //   Nakama.game.input.activePointer.x,
    //   Nakama.game.input.activePointer.y
    // );
    // this.sprite.rotation = this.configs.TARGETANGLE + Math.PI/2;
    //
    // this.sprite.body.velocity.x = Math.cos(this.sprite.rotation - Math.PI/2) * 1000;
    // this.sprite.body.velocity.y = Math.sin(this.sprite.rotation - Math.PI/2) * 1000;
  }

  update() {
    //console.log('fire');

    Nakama.game.physics.arcade.overlap(
      Nakama.enemyGroup,
      Nakama.bulletGroup,
      this.onBulletHitEnemy
    );
  }

   onBulletHitEnemy (enemySprite, BulletSprite) {
    Nakama.explosions.push(new Explode(enemySprite.position.x, enemySprite.position.y));
    enemySprite.kill();
    Nakama.explosionSound.push(new ExplodeSound('enemyExplodeSound', 0.2));
    //score ---- bonus kill enemy
    Nakama.score += Nakama.configs.BONUS_KILL_ENEMY;
  }

  killBullet () {
    this.sprite.kill();
  }
}
