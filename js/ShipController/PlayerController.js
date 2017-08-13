class PlayerController {
  constructor () {
    this.sprite = Nakama.playerGroup.create(Nakama.game.scale.maxWidth/2, Nakama.game.scale.maxHeight/2, 'player');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setCircle(this.sprite.width/2);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.SHIP_SPEED = 300;
    this.sprite.TURN_SPEED = 20;
  }

  update() {
    //set Speed
    if (this.sprite.position.x + 60 > Nakama.game.input.activePointer.x
      && this.sprite.position.x - 60 < Nakama.game.input.activePointer.x
      && this.sprite.position.y + 60 > Nakama.game.input.activePointer.y
      && this.sprite.position.y - 60 < Nakama.game.input.activePointer.y
    ) {
      this.sprite.SHIP_SPEED = 200;
    } else {
      this.sprite.SHIP_SPEED = 300;
    }

    if (this.sprite.position.x + 30 > Nakama.game.input.activePointer.x
      && this.sprite.position.x - 30 < Nakama.game.input.activePointer.x
      && this.sprite.position.y + 30 > Nakama.game.input.activePointer.y
      && this.sprite.position.y - 30 < Nakama.game.input.activePointer.y
    ) {
      this.sprite.SHIP_SPEED = 100;
    } else {
      this.sprite.SHIP_SPEED = 300;
    }

    if (this.sprite.position.x + 300 < Nakama.game.input.activePointer.x
      || this.sprite.position.x - 300 > Nakama.game.input.activePointer.x
      || this.sprite.position.y + 300 < Nakama.game.input.activePointer.y
      || this.sprite.position.y - 300 > Nakama.game.input.activePointer.y
    ) {
      this.sprite.SHIP_SPEED = 400;
    } else {
      this.sprite.SHIP_SPEED = 300;
    }

    if (this.sprite.position.x + this.sprite.width/2 > Nakama.game.input.activePointer.x
      && this.sprite.position.x - this.sprite.width/2 < Nakama.game.input.activePointer.x
      && this.sprite.position.y + this.sprite.height/2 > Nakama.game.input.activePointer.y
      && this.sprite.position.y - this.sprite.height/2 < Nakama.game.input.activePointer.y
    ) {
      //console.log('Stop');
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
      return;
    }
    var targetAngle = Nakama.game.math.angleBetween(
      this.sprite.position.x,
      this.sprite.position.y,
      Nakama.game.input.activePointer.x,
      Nakama.game.input.activePointer.y
    );

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

      //set SPEED
      this.sprite.body.velocity.x = Math.cos(this.sprite.rotation - Math.PI/2) * this.sprite.SHIP_SPEED;
      this.sprite.body.velocity.y = Math.sin(this.sprite.rotation - Math.PI/2) * this.sprite.SHIP_SPEED;
    }
  }
}
