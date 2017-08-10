class EnemyType2Controller {
  constructor(PosX, PosY, VelX, VelY) {
    this.sprite = Nakama.enemyGroup.create(PosX, PosY, 'enemy2');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setCircle(this.sprite.width/2);
    this.sprite.update = this.update.bind(this);
    this.sprite.scale.set(0.9);

    this.sprite.body.velocity.x = VelX;
    this.sprite.body.velocity.y = VelY;
  }

  update() {}
}
