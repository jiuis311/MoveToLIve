class SunToken {
  constructor() {
    // this.x = Math.floor((Math.random() * Nakama.game.scale.maxWidth - 150) + 150);
    this.x = Nakama.game.rnd.integerInRange(200, Nakama.game.scale.maxWidth - 200)
    // this.y = Math.floor((Math.random() * Nakama.game.scale.maxHeight - 150) + 150);
    this.y = Nakama.game.rnd.integerInRange(200, Nakama.game.scale.maxHeight - 200)
    this.sprite = Nakama.sunTokenGroup.create(this.x, this.y, 'SunToken');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setCircle(this.sprite.width/2 - 150);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    // set scale
    this.sprite.scaleSize = 0.025;
    this.sprite.scale.set(this.sprite.scaleSize);
    this.sprite.ROTATE_SPEED = 1;

    //kill Sun
    this.timerSprite = Nakama.game.time.events;
    this.timerSprite.repeat(25000, 1, this.killSprite, this);
  }

  update() {
    Nakama.game.physics.arcade.overlap(
      Nakama.playerGroup,
      Nakama.sunTokenGroup,
      this.onPlayerHitToken
    );

    if (this.sprite.scaleSize <= 0.25) {
      this.sprite.scaleSize += 0.025;
      this.sprite.scale.set(this.sprite.scaleSize);
    }
    this.sprite.rotation += Nakama.game.math.degToRad(this.sprite.ROTATE_SPEED);
  }

  onPlayerHitToken (playerSprite, sunTokenSprite) {
    Nakama.suns.push(new SunController(sunTokenSprite.position.x, sunTokenSprite.position.y));
   sunTokenSprite.kill();
 }


 killSprite () {
   this.sprite.kill();
 }
}
