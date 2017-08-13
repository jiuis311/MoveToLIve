class BulletPool {
  constructor() {
    this.pool = [];
    var tmpEnemy = {};
    for(var i=0; i<50; i++) {
      tmpEnemy = new Bullet();
      tmpEnemy.sprite.kill();
      this.pool.push(tmpEnemy.sprite);
    }
  }

  addBullet() {
    for(var i = 0; i < this.pool.length; i++) {
      if (!this.pool[i].alive) {
        this.pool[i].reset(Nakama.player.sprite.position.x, Nakama.player.sprite.position.y);
        var TARGETANGLE = Nakama.game.math.angleBetween(
          Nakama.player.sprite.position.x,
          Nakama.player.sprite.position.y,
          Nakama.game.input.activePointer.x,
          Nakama.game.input.activePointer.y
        );
        this.pool[i].rotation = TARGETANGLE + Math.PI/2;
        this.pool[i].body.velocity.x = Math.cos(this.pool[i].rotation - Math.PI/2) * 1000;
        this.pool[i].body.velocity.y = Math.sin(this.pool[i].rotation - Math.PI/2) * 1000;
        break;
      }
    }
  }
}
