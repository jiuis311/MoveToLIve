class MeteorController {
  constructor() {
    this.x = Math.floor((Math.random() * Nakama.game.scale.maxWidth) + 1);
    this.y = Math.floor((Math.random() * Nakama.game.scale.maxHeight) + 1);
    this.z = Math.floor((Math.random() * 4) + 1);
    this.METEOR_SCALE = Nakama.game.rnd.integerInRange(3, 7);

    if (this.z == 1) this.y = -100;
    if (this.z == 2) this.x = Nakama.game.scale.maxWidth + 100;
    if (this.z == 3) this.y = Nakama.game.scale.maxHeight + 100;
    if (this.z == 4) this.x = -100;

    this.sprite = Nakama.meteorGroup.create(this.x, this.y, 'meteor');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.scale.set(this.METEOR_SCALE/10);
    this.sprite.body.setCircle(this.sprite.width/2);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.setCircle(this.sprite.width/2);
    this.sprite.ROTATE_SPEED = 5;
    // this.posx = (Nakama.player.sprite.position.x - this.sprite.position.x) / 1.5;
    // this.posy = (Nakama.player.sprite.position.y - this.sprite.position.y) / 1.5;
    // this.sprite.body.velocity.x = 100;
    // this.sprite.body.velocity.y = 100;
    this.sprite.update = this.update.bind(this);

  }

  update() {
    // if (this.DIRECTION == true) {
    //   this.sprite.body.velocity.x = (Nakama.player.sprite.position.x - this.x) / 1.5;
    //   this.sprite.body.velocity.y = (Nakama.player.sprite.position.y - this.y) / 1.5;
    //   this.DIRECTION = false;
    // }
    // this.sprite.body.velocity.x = this.posx;
    // this.sprite.body.velocity.y = this.posy;
    this.sprite.rotation += Nakama.game.math.degToRad(this.sprite.ROTATE_SPEED);
    Nakama.game.physics.arcade.overlap(
      Nakama.playerGroup,
      Nakama.meteorGroup,
      this.onMeteorHitPlayer
    );
    Nakama.game.physics.arcade.overlap(
      Nakama.shieldGroup,
      Nakama.meteorGroup,
      this.onMeteorHitShield
    );
  }

  onMeteorHitPlayer (playerSprite, meteorSprite) {
    Nakama.explodePlayer = new Explode(playerSprite.position.x, playerSprite.position.y, 'explodePlayer');
    Nakama.explosions.push(new Explode(playerSprite.position.x, playerSprite.position.y));
    playerSprite.kill();
    Nakama.playerShooting = false;
    Nakama.explosionSound.push(new ExplodeSound('playerExplodeSound', 0.4));

    //scorring -- Define death
    setTimeout(function() {Nakama.playerDie = true;}, 2000);
 }

  onMeteorHitShield (shieldSprite, meteorSprite) {
   shieldSprite.kill();
 }
}
