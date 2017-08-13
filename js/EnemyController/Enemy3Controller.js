class Enemy3Controller {
  constructor () {
  this.sprite = Nakama.enemy3Group.create(Nakama.game.scale.maxWidth - 100, Nakama.game.scale.maxHeight - 100, 'EnemyShip');
  Nakama.game.physics.arcade.enable(this.sprite);
  this.sprite.update = this.update.bind(this);
  this.sprite.body.setCircle(this.sprite.width/2);
  this.sprite.anchor = new Phaser.Point(0.5, 0.5);
  this.sprite.TURN_SPEED = 30;
}

  update() {
    var targetAngle = Nakama.game.math.angleBetween(
      this.sprite.position.x,
      this.sprite.position.y,
      Nakama.player.sprite.position.x,
      Nakama.player.sprite.position.y
    );
    if (this.sprite.position.x != Nakama.game.scale.maxWidth - 100
    && this.sprite.position.y != Nakama.game.scale.maxHeight - 100)
    {
      this.sprite.position.x += -10;
      this.sprite.position.y += -10;
    }

    if (this.sprite.rotation != targetAngle + Math.PI/2) {
      //get delta angle between 2 pointer
      var delta = targetAngle + Math.PI/2 - this.sprite.rotation;
      //set delta from -180 to 180
      if (delta > Math.PI) delta -= Math.PI * 2;
      if (delta < -Math.PI) delta += Math.PI * 2;

      //turn
      if (delta > 0) {
        this.sprite.rotation += Nakama.game.math.degToRad(this.sprite.TURN_SPEED);
      }
      if (delta < 0) {
        this.sprite.rotation -= Nakama.game.math.degToRad(this.sprite.TURN_SPEED);
      }

      //if angle is too small then turn straight
      if (Math.abs(delta) < Nakama.game.math.degToRad(this.sprite.TURN_SPEED)) {
        this.sprite.rotation = targetAngle + Math.PI/2;
      }
    }
  }
}
