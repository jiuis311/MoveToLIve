class SunController {
  constructor(x, y) {
    this.sprite = Nakama.sunGroup.create(x, y, 'BurningSun');
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setCircle(this.sprite.width/2 - 30);
    this.sprite.update = this.update.bind(this);
    this.sprite.ROTATE_SPEED = 1;

    //scale
    this.sprite.SET_SCALE = 0.01;
    this.sprite.scale.set(this.sprite.SET_SCALE);

    //kill Sun
    this.timerSprite = Nakama.game.time.events;
    this.timerSprite.repeat(7500, 1, this.killSprite, this);

    //shrink
    this.sprite.SHRINK = false;
    this.timerSprite.repeat(7200, 1, this.shrinkSprite, this);
  }

  update() {
    if (this.sprite.SET_SCALE < 1 && this.sprite.SHRINK == false) {
      this.sprite.SET_SCALE += 0.05;
      this.sprite.scale.set(this.sprite.SET_SCALE);
    }
    this.sprite.rotation += Nakama.game.math.degToRad(this.sprite.ROTATE_SPEED);

    if (this.sprite.SHRINK) {
      if (this.sprite.SET_SCALE > 0.05) {
        this.sprite.SET_SCALE -= 0.05;
        this.sprite.scale.set(this.sprite.SET_SCALE);
      }
    }

    Nakama.game.physics.arcade.overlap(
      Nakama.enemyGroup,
      Nakama.sunGroup,
      this.onSunHitEnemy
    );
  }

  killSprite () {
    this.sprite.kill();
  }

  shrinkSprite() {
    this.sprite.SHRINK = true;
  }

  onSunHitEnemy (enemySprite, sunSprite) {
   Nakama.explosions.push(new Explode(enemySprite.position.x, enemySprite.position.y));
   enemySprite.kill();
   Nakama.explosionSound.push(new ExplodeSound('enemyExplodeSound', 0.2));

   //score ---- bonus kill enemy
   Nakama.score += Nakama.configs.BONUS_KILL_ENEMY;
 }
}
