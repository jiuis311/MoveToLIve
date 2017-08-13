class EnemyBulletPool {
  constructor() {
    this.pool = [];
    var tmpEnemy = {};
    for(var i=0; i<20; i++) {
      tmpEnemy = new EnemyBullet();
      tmpEnemy.sprite.kill();
      this.pool.push(tmpEnemy.sprite);
    }
  }

  addEnemyBullet() {
    for(var i = 0; i < this.pool.length; i++) {
      if (!this.pool[i].alive) {
        this.pool[i].reset(Nakama.enemy3.sprite.position.x, Nakama.enemy3.sprite.position.y);
        this.pool[i].rotation = Nakama.enemy3.sprite.rotation;
        this.pool[i].body.velocity.x = Math.cos(Nakama.enemy3.sprite.rotation - Math.PI/2) * 600;
        this.pool[i].body.velocity.y = Math.sin(Nakama.enemy3.sprite.rotation - Math.PI/2) * 600;
        break;
      }
    }
  }
}
