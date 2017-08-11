class BulletToken {
  constructor() {
    this.x = Nakama.game.rnd.integerInRange(200, Nakama.game.scale.maxWidth - 200)
    this.y = Nakama.game.rnd.integerInRange(200, Nakama.game.scale.maxHeight - 200)
    this.sprite = Nakama.bulletTokenGroup.create(this.x, this.y, 'BulletToken');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);

    // set scale
    this.sprite.scaleSize = 0.005;
    this.sprite.scale.set(this.sprite.scaleSize);

    this.sprite.ROTATE_SPEED = 1;

    //kill Sun
    this.timerSprite = Nakama.game.time.events;
    this.timerSprite.repeat(25000, 1, this.killSprite, this);
  }

  update() {
    Nakama.game.physics.arcade.overlap(
      Nakama.playerGroup,
      Nakama.bulletTokenGroup,
      this.onPlayerHitToken
    );
    if (this.sprite.scaleSize <= 0.4) {
      this.sprite.scaleSize += 0.04;
      this.sprite.scale.set(this.sprite.scaleSize);
    }
    this.sprite.rotation += Nakama.game.math.degToRad(this.sprite.ROTATE_SPEED);
  }

  onPlayerHitToken (playerSprite, tokenSprite) {
   tokenSprite.kill();
   function fire(n){
     for(var i  = n; i >= 0; i--){
         setTimeout(function () {
           Nakama.bullets.push(new Bullet(0));
           n--;
         }, i*300);
       }
   }
   fire(40);
 }

 killSprite () {
   this.sprite.kill();
 }
}
