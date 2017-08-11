class EnemyType2Controller {
  constructor(PosX, PosY, VelX, VelY) {
    this.sprite = Nakama.enemyGroup.create(PosX, PosY, 'enemy2');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setCircle(this.sprite.width/2);
    this.sprite.update = this.update.bind(this);
    this.sprite.scale.set(0.9);

    this.VelX = VelX;
    this.VelY = VelY;
    this.sprite.body.velocity.x = VelX;
    this.sprite.body.velocity.y = VelY;

    //kill shield
    this.timerEnemy2Kill = Nakama.game.time.events;
    this.timerEnemy2Kill.repeat(15000, 1, this.killEnemy2, this);
  }

  update() {
    this.sprite.body.velocity.x = this.VelX;
    this.sprite.body.velocity.y = this.VelY;
  }

  killEnemy2 () {
    this.sprite.kill();
  }
}
