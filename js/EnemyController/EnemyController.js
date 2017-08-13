class EnemyController {
  constructor () {
    this.x = Math.floor((Math.random() * Nakama.game.scale.maxWidth) + 1);
    this.y = Math.floor((Math.random() * Nakama.game.scale.maxHeight) + 1);
    this.z = Math.floor((Math.random() * 4) + 1);

    if (this.z == 1) this.y = -30;
    if (this.z == 2) this.x = Nakama.game.scale.maxWidth + 30;
    if (this.z == 3) this.y = Nakama.game.scale.maxHeight + 30;
    if (this.z == 4) this.x = -30;

    this.sprite = Nakama.enemyGroup.create(this.x, this.y, 'enemy');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setCircle(this.sprite.width/2);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.ENEMY_SPEED = 300;
    this.sprite.TURN_SPEED = 2;
    console.log('create1');
  }

  update() {

    Nakama.game.physics.arcade.overlap(
      Nakama.enemyGroup,
      Nakama.playerGroup,
      this.onEnemyHitPlayer
    );

    var targetAngle = Nakama.game.math.angleBetween(
      this.sprite.position.x,
      this.sprite.position.y,
      Nakama.player.sprite.position.x,
      Nakama.player.sprite.position.y
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
      this.sprite.body.velocity.x = Math.cos(this.sprite.rotation - Math.PI/2) * this.sprite.ENEMY_SPEED;
      this.sprite.body.velocity.y = Math.sin(this.sprite.rotation - Math.PI/2) * this.sprite.ENEMY_SPEED;
    }
  }

  onEnemyHitPlayer (enemySprite, playerSprite) {
    Nakama.explodePlayer = new Explode(playerSprite.position.x, playerSprite.position.y, 'explodePlayer');
    Nakama.explosions.push(new Explode(playerSprite.position.x, playerSprite.position.y));
    playerSprite.kill();
    Nakama.playerShooting = false;
    Nakama.explosionSound.push(new ExplodeSound('playerExplodeSound', 0.4));

    //scorring -- Define death
    setTimeout(function() {Nakama.playerDie = true;}, 2000);
    }
}
