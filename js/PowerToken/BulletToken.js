class BulletToken {
  constructor() {
    this.x = Nakama.game.rnd.integerInRange(200, Nakama.game.scale.maxWidth - 200)
    this.y = Nakama.game.rnd.integerInRange(200, Nakama.game.scale.maxHeight - 200)
    this.sprite = Nakama.bulletTokenGroup.create(this.x, this.y, 'BulletToken');
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.update = this.update.bind(this);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.setCircle(this.sprite.width/2*0.4 , 50, 50);


    // set scale
    this.sprite.scaleSize = 0.005;
    this.sprite.scale.set(this.sprite.scaleSize);

    this.sprite.ROTATE_SPEED = 1;

    //kill Sun
    this.timerSprite = Nakama.game.time.events;
    this.timerSprite.repeat(25000, 1, this.killSprite, this);

    //bullet count
    this.sprite.BULLET_MAX = 40;
    this.sprite.BULLET_COUNT = 0;
    this.sprite.FIRE = false;
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
    // if (this.sprite.FIRE) {
    //   // this.createBullet();
    //   Nakama.bullets.push(new Bullet(0));
    //   this.sprite.BULLET_COUNT++;
    //   // this.FIRE = false;
    // }
    //
    // if (this.sprite.BULLET_COUNT > this.sprite.BULLET_MAX || Nakama.playerDie) {
    //   // this.FIRE = false;
    //   clearInterval(this.bulletInterval);
    // }
  }

  onPlayerHitToken (playerSprite, tokenSprite) {
   tokenSprite.kill();
   Nakama.playerShooting = true;
   Nakama.bulletPool = new BulletPool();
   fire(40);

     function fire(n){
       Nakama.bulletPool.addBullet();
       if (!Nakama.playerShooting) n = 0;
       if (n > 0){
         setTimeout(function(){ fire(n - 1)}, 300);
       }
     }
 }

 killSprite () {
   this.sprite.kill();
 }

 // createBullet() {
 //   this.bulletInterval = setInterval(function(){ Nakama.bullets.push(new Bullet(0)); }, 300);
 // }
}
