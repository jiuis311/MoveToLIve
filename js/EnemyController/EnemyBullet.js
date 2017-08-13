class EnemyBullet {
  constructor() {
    this.sprite = Nakama.enemyBulletGroup.create(Nakama.enemy3.sprite.position.x, Nakama.enemy3.sprite.position.y, 'EnemyBullet');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    //kill Bullet
    this.timerBulletKill = Nakama.game.time.events;
    this.timerBulletKill.repeat(10000, 1, this.killBullet, this);

    this.sprite.rotation = Nakama.enemy3.sprite.rotation;
    this.sprite.body.velocity.x = Math.cos(Nakama.enemy3.sprite.rotation - Math.PI/2) * 600;
    this.sprite.body.velocity.y = Math.sin(Nakama.enemy3.sprite.rotation - Math.PI/2) * 600;
  }

  update() {
    this.sprite.rotation = Nakama.enemy3.sprite.rotation;
    this.sprite.body.velocity.x = Math.cos(Nakama.enemy3.sprite.rotation - Math.PI/2) * 600;
    this.sprite.body.velocity.y = Math.sin(Nakama.enemy3.sprite.rotation - Math.PI/2) * 600;
    Nakama.game.physics.arcade.overlap(
      Nakama.enemyBulletGroup,
      Nakama.playerGroup,
      this.onBulletHitEnemy
    );
  }

   onBulletHitEnemy (enemyBulletSprite, playerSprite) {
     Nakama.explodePlayer = new Explode(playerSprite.position.x, playerSprite.position.y, 'explodePlayer');
     Nakama.explosions.push(new Explode(playerSprite.position.x, playerSprite.position.y));
     playerSprite.kill();
     Nakama.playerShooting = false;
     Nakama.explosionSound.push(new ExplodeSound('playerExplodeSound', 0.4));
     setTimeout(function() {Nakama.playerDie = true;}, 2000);
  }

  killBullet () {
    this.sprite.kill();
  }
}
